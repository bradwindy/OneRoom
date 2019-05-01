import React, {Component} from 'react';
import axios from 'axios';
//import Room from '/Room';

class Rooms extends Component {
    constructor(props){
        super(props);

        //Have just hardcoded data to test
        this.state = {
            rooms: [
                {name: 'GO1', capacity: 5, facilities: 'tv', id: 1234},
                {name: 'GO2', capacity: 6, facilities: 'tv', id: 1235},
                {name: 'GO3', capacity: 7, facilities: 'tv', id: 1236}

        ]
    };
}

    componentDidMount() {
        axios.get(`/room/all`)
            .then(res => {
                const rooms = res.data;
                console.log(res);
                this.setState({ rooms });
            })
    };

    //Function to loop through the array of rooms and display them as individual rooms
    getRoomCards(){
        if (this.state.rooms.length === 0) return <p>There are no rooms available for this date.</p>;

        return this.state.rooms.map((room, key) => 

            <div className="card m-2" style="width: 18rem;" key={room.id}>

                <div className="card-body">
                    <h5 className="card-title">`Room: ${this.room.name}`</h5>
                    <p className="card-text">`Room Capacity: ${this.room.capacity}`</p>
                    <a href="#" className="btn btn-primary">Learn more</a>
                </div>
            </div>
        )};


    render() {
    
        return{}
            
             //https://medium.com/javascript-in-plain-english/how-to-loop-through-arrays-in-react-3eaa8a14445
               //We can implement a new componenet.. {this.state.rooms.map((item, key) => <Room item={item} key={item.id} />

   
        
    }
}

export default Rooms;