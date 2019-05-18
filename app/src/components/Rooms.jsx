import React, {Component} from 'react';
import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';


//import Room from '/Room';
import moment from 'moment';
import {Redirect} from "react-router-dom";

class Rooms extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            redirect: false,
            bookingID: ""
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleBook = this.handleBook.bind(this);
    }


    //decorate the function with async as we are using the await method

    componentDidMount = async () => {
        setAuthorizationToken(localStorage.jwtToken);
        const {data: rooms} = await axios.get('/room/all');
        //pending > resolved (success) or rejected(failure)
        this.setState({rooms});
        this.setState({redirect: false});
    };

    trueFalsetoYesNo(bool) {
        if (bool) {
            return "Yes"
        } else {
            return "No"
        }
    }

//Handle booking - recieves the room id of the room to be booked. Passes this through. 
handleBook = (roomId) => {
    console.log(roomId);
    //Need to check if this is working. 
    axios.patch('/newBooking/' + roomId);
    console.log("Room Id: ", roomId);

    //Update the rooms list to not show the room that has been booked. 
    //This could be a backend thing. 
    const rooms = this.state.rooms.filter(r => r._id !== roomId);
    this.setState({rooms});
    
};

    //Function to loop through the array of rooms and display them as individual rooms
    getRoomCards() {

        if (this.state.rooms.length === 0)
          return (
            <div className="card mt-3 w-75 mx-auto mt-5">
              <div className="card-body m-1 mt-3 text-center">
                <p>There are no rooms available for this date.</p>
                <a href="/book/date" class="card-link text-center">
                  Go back
                </a>
              </div>
            </div>
          );
        


        return (
            <div className="container pt-4 p-2">
                <h2 className="pl-3 pb-3 pt-2"><b>Availabilities:</b></h2>
                {this.state.rooms.map((room) =>

                    <div className="card m-2" key={room.name}>
                        <div className="card-body">
                            <h5 className="card-title font-weight-bold">Room: {room.name}</h5>
                            <ul className="card-text list-unstyled">
                                <li>
                                    <b>Capacity:</b> {room.capacity}
                                </li>
                                <li>
                                    <b>Room TV:</b> {this.trueFalsetoYesNo(room.facilities.tv)}
                                </li>
                                <li>
                                    <b>Room Projector:</b> {this.trueFalsetoYesNo(room.facilities.projector)}
                                </li>
                                <li>
                                    <b>Room Whiteboard:</b> {this.trueFalsetoYesNo(room.facilities.whiteboard)}
                                </li>
                            </ul>
                            <button onClick={() => {
                                // noinspection JSIgnoredPromiseFromCall
                                this.handleBook(room.name, room._id)
                            }} className="btn btn-success mt-2">Book
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )

    };

    handleBook = async (roomName, roomID) => {
        const bookingData = this.props.location.data;
        let proposedDate = bookingData.date + "T00:00:00.000Z";

        const timeNumList = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

        let momentDateStart = moment(proposedDate).add(timeNumList[bookingData.timePos], 'hour');
        let momentDateEnd = moment(proposedDate).add(timeNumList[parseInt(bookingData.timePos) + parseInt(bookingData.duration)], 'hour');

        let formatDateStart = moment.utc(momentDateStart).format();
        let formatDateEnd = moment.utc(momentDateEnd).format();

        const bookingName = bookingData.name;
        const user = "5cb55db0df1cb758b50bf2a4";

        await axios.put('/booking/newBooking/' + roomID, {
            startTime: formatDateStart, endTime: formatDateEnd, roomId: roomID, bookingName, user
        })
            .then(res => {
                let booking = res.data.bookings[res.data.bookings.length - 1];
                this.setState({bookingID: booking._id});
            });

        let newBooking = {
            time: moment.utc(formatDateStart).format('hh:mm a') + " - " + moment.utc(formatDateEnd).format('hh:mm a'),
            roomId: roomID,
            bookingName: bookingName,
            bookingId: this.state.bookingID,
            bookingDate: moment(proposedDate).format('dddd MMMM Do'),
            bookingRoomName: roomName,
        };

        this.props.appendBookingFunc(newBooking);
        this.setState({redirect: true});
    };


    render() {
        if (this.state.redirect) {
            return <Redirect to={"/"}/>;
        }

        return (
            <div>
                {this.getRoomCards()}
            </div>
        )

    }
}

export default Rooms;