import React, {Component} from 'react';
import axios from 'axios';

import Room from './Room';

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

//Handle booking - recieves the room id of the room to be booked. Passes this through. 
handleBook = (roomId) => {
    console.log("Room is booked");
    axios.patch('/booking', {roomiD: roomId});
    console.log("Room Id: ", roomId);

    //Update the rooms list to not show the room that has been booked. 
    //This could be a backend thing. 
    //const rooms = this.state.rooms.filter(r => r.id !== room.id);
    //this.setState({rooms});
    
};

    //Function to loop through the array of rooms and display them as individual rooms
    getRoomCards(){
        
        if (this.state.rooms.length === 0) return <p>There are no rooms available for this date.</p>;


        //This is if we want to keep it all within the same class. 
        return this.state.rooms.map((room, key) => 

            <div className="card m-2" key={room.id}>
                <div className="card-body">
                    <h5 className="card-title">Room: {room.name}</h5>
                    <p className="card-text"><b>Room Capacity:</b> {room.capacity}</p>          
                    <p className="card-text"><b>Room Facilities</b> {room.facilities.tv}</p>
                    <p className="card-text"><b>Available</b> {room.available}</p>
                    <button onClick={ () => this.handleBook(room.id)} className="btn btn-primary mt-2">Book</button>
                </div>
                
            </div>

            /*
              {this.state.rooms.map(room => (
                    <Room 
                    key={Room.id} 
                    onBook={this.handleBook} 
                    name={Room.name} 
                    capacity={Room.capacity}  
                    />
                ))};*/
        )
        };

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