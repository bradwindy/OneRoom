import React, {Component} from 'react';
import axios from 'axios';
//import Room from '/Room';

class Rooms extends Component {
    constructor(props){
        super(props);

        //Have just hardcoded data to test
        this.state = {
            rooms: [
                //{id: 1234, name: 'g01', capacity: 4}
            ]
    };

    this.componentDidMount = this.componentDidMount.bind(this);
}


//decorate the function with async as we are using the await method

async componentDidMount() {
    const {data: rooms} = await axios.get('https://jsonplaceholder.typicode.com/posts');
    //pending > resolved (success) or rejected(failure)
    this.setState({ rooms });
    
}

/*
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts');
            then(res => {
                const rooms = res.data;
                console.log(res);
                this.setState({ rooms });
            })
    };*/

    //Function to loop through the array of rooms and display them as individual rooms
    getRoomCards(){
        
        
        if (this.state.rooms.length === 0) return <p>There are no rooms available for this date.</p>;

      
        return this.state.rooms.map((room, key) => 

            <div className="card m-2" key={room.userId}>
                <div className="card-body">
                    <h5 className="card-title">Room: {room.title}</h5>
                    <p className="card-text"><b>Room Details:</b> {room.body}</p>
                    <p className="card-text"><b>Room Capacity</b> {room.id}</p>
                    <button onClick={this.handleBook} className="btn btn-primary mt-2">Book</button>
                </div>
            </div>
        )};


        handleBook = event => {
            console.log("Room is booked");
            

            //handle the booking button to enure that the room is booked. 
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