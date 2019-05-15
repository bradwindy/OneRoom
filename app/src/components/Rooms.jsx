import React, {Component} from 'react';
import axios from 'axios';



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

async componentDidMount() {
    const {data: rooms} = await axios.get('/room/all');
    //pending > resolved (success) or rejected(failure)
    this.setState({ rooms });  
}

    //Function to loop through the array of rooms and display them as individual rooms
    getRoomCards(){
        
        if (this.state.rooms.length === 0) return <p>There are no rooms available for this date.</p>;

      
        return this.state.rooms.map((room, key) => 

            <div className="card m-2" key={room.name}>
                <div className="card-body">
                    <h5 className="card-title">Room: {room.name}</h5>
                    <p className="card-text"><b>Room Capacity:</b> {room.capacity}</p>          
                    <p className="card-text"><b>Room Facilities</b> {room.facilities.tv}</p>
                    <button onClick={this.handleBook} className="btn btn-primary mt-2">Book</button>
                </div>
            </div>
        )};

        handleBook = event => {
            console.log("Room is booked");
            /*
            //To send the room booked to the backend. 
            axios.patch('/booking', {roomId: room.id});
            //handle the booking button to enure that the room is booked. 
            console.log("Room Booked");*/
        }


    render() {
    
        return(
            <div>
                <h3>All rooms available on this date to book:</h3>
            {this.getRoomCards()}
                </div>
            
        )
        
    }
}

export default Rooms;