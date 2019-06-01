import React, {Component} from 'react';
import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import moment from 'moment';
import {Redirect} from "react-router-dom";

// Component that renders a list of room cards
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

    componentDidMount = async () => {
        setAuthorizationToken(localStorage.jwtToken);
        // Get list of rooms from database
        const {data: rooms} = await axios.get('/room/all');
        this.setState({rooms});
        this.setState({redirect: false});
    };

    // Turns boolean value to a yes or no
    trueFalseToYesNo = bool => {
        if (bool) {
            return "Yes"
        } else {
            return "No"
        }
    };

    //Function to loop through the array of rooms and display them as individual rooms
    getRoomCards() {
        // If there are no rooms returned from database, inform user.
        if (this.state.rooms.length === 0)
          return (
            <div className="card mt-3 w-75 mx-auto mt-5">
              <div className="card-body m-1 mt-3 text-center">
                <p>There are no rooms available for this date.</p>
                  <a href="/book/date" className="card-link text-center">
                  Go back
                </a>
              </div>
            </div>
          );

        // Map list of rooms to cards with room information badges
        return (
            <div className="container pt-4 p-4">
                <h2 className="pl-3 pb-3 pt-4 font-weight-bold">Availabilities:</h2>
                {this.state.rooms.map((room) =>

                    <div className="card m-2" key={room.name}>
                        <div className="card-body">
                            <h4 className="card-title font-weight-bold mb-2">{room.name}</h4>
                            <ul className="card-text list-unstyled">
                                <li>
                                    <h5>
                                        <span className="badge blue-grey mr-2"><FontAwesomeIcon
                                            icon="users"/> {room.capacity}</span>
                                        <span className="badge blue-grey mr-2"><FontAwesomeIcon
                                            icon="tv"/> {this.trueFalseToYesNo(room.facilities.tv)}</span>
                                        <span className="badge blue-grey mr-2"><FontAwesomeIcon
                                            icon="video"/> {this.trueFalseToYesNo(room.facilities.projector)}</span>
                                        <span className="badge blue-grey mr-2"><FontAwesomeIcon
                                            icon="chalkboard"/> {this.trueFalseToYesNo(room.facilities.whiteboard)}</span>
                                    </h5>
                                </li>
                            </ul>
                            <button onClick={() => {
                                // noinspection JSIgnoredPromiseFromCall
                                this.handleBook(room.name, room._id)
                            }} className="btn btn-info m-0"><FontAwesomeIcon icon="plus"/> Book
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )

    };

    // Function that handles the booking of the room based on information passed through to this page and room chosen
    handleBook = async (roomName, roomID) => {
        // Get the data of booking, passed through using Link method of react router
        const bookingData = this.props.location.data;

        // Turn date to moment compatible format
        let proposedDate = bookingData.date + "T00:00:00.000Z";

        // Time list to chosen chosen position in list into integer
        const timeNumList = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

        // Add time to date
        let momentDateStart = moment(proposedDate).add(timeNumList[bookingData.timePos], 'hour');
        let momentDateEnd = moment(proposedDate).add(timeNumList[parseInt(bookingData.timePos) + parseInt(bookingData.duration)], 'hour');

        // Format datetime to correct value needed for database
        let formatDateStart = moment(momentDateStart).format();
        let formatDateEnd = moment(momentDateEnd).format();

        // Default booking name if no name is provided
        let bookingName = "Booking";

        // If name is provided, adjust booking name
        if (bookingData.name !== "" && bookingData.name !== null) {
            bookingName = bookingData.name;
        }

        // get email value from localstorage
        const uName = localStorage.getItem("email");
        // Get data related to username from database
        const userInfo = await axios.get('/user/' + uName);
        // Get user id from info to save with booking
        const user = userInfo.data._id;

        // save booking to database
        await axios.put('/booking/newBooking/' + roomID, {
            startTime: formatDateStart, endTime: formatDateEnd, roomId: roomID, bookingName, user
        })
            .then(res => {
                // Get resulting booking ID so it can be save locally
                let booking = res.data.bookings[res.data.bookings.length - 1];
                this.setState({bookingID: booking._id});
            });

        // create booking object so it can be saved locally. This is so a refresh does not affect list of user bookings
        let newBooking = {
            time: moment.utc(formatDateStart).format('hh:mm a') + " - " + moment.utc(formatDateEnd).format('hh:mm a'),
            roomId: roomID,
            bookingName: bookingName,
            bookingId: this.state.bookingID,
            bookingDate: moment(proposedDate).format('dddd MMMM Do'),
            bookingRoomName: roomName,
        };

        // send booking to append function passed from app.js to save locally
        this.props.appendBookingFunc(newBooking);
        // redirect
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