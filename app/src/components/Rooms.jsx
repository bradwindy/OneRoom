import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

//import Room from '/Room';

class Rooms extends Component {
    constructor(props){
        super(props);

        //Have just hardcoded data to test
        this.state = {
            rooms: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
}


//decorate the function with async as we are using the await method

componentDidMount = async () => {
    const {data: rooms} = await axios.get('/room/all');
    //pending > resolved (success) or rejected(failure)
    this.setState({ rooms });
};

    //Function to loop through the array of rooms and display them as individual rooms
    getRoomCards(){
        
        if (this.state.rooms.length === 0) return <p>There are no rooms available for this date.</p>;

      
        return(
            <div className="container pt-4 p-2">
                <h2 className="pl-3 pb-3 pt-2"><b>Availabilities:</b></h2>
                {this.state.rooms.map((room, key) =>

                    <div className="card m-2" key={room.name}>
                        <div className="card-body">
                            <h5 className="card-title font-weight-bold">Room: {room.name}</h5>
                            <ul className="card-text list-unstyled">
                                <li>
                                    <b>Room Capacity:</b> {room.capacity}
                                </li>
                                <li>
                                    <b>Room TV:</b> {room.facilities.tv.toString()}
                                </li>
                                <li>
                                    <b>Room ID:</b> {room._id}
                                </li>
                            </ul>
                            <button onClick={() => {this.handleBook(room.name, room._id)}} className="btn btn-primary mt-2">Book</button>
                        </div>
                    </div>
                )}
            </div>
        )

    };

    handleBook = (roomName, roomID) => {
        const bookingData = this.props.location.data;
        const timeList = ["0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200"];
        const start = moment(timeList[bookingData.timePos], "hmm").format("HH:mm");
        const end = moment(timeList[(bookingData.timePos)+(bookingData.duration)], "hmm").format("HH:mm");

        axios.patch(`/booking/newBooking/${roomID}`, {startTime: start, endTime: end, roomId: roomID});
    };


    render() {
        return(
            <div>
                {this.getRoomCards()}
            </div>
            
        )
        
    }
}

export default Rooms;