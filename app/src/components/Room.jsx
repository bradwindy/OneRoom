import React, { Component } from 'react';

class Room extends Component {

    render() { 
        return ( 


             <div className="card m-2" key={this.props.id}>
                <div className="card-body">
                    <h5 className="card-title">Room: {this.props.name}</h5>
                    <p className="card-text"><b>Room Capacity:</b> {this.props.capacity}</p>          
                    <p className="card-text"><b>Room Facilities</b> {this.props.facilities.tv}</p>
                    <p className="card-text"><b>Available</b> {this.props.available}</p>
                    <button onClick={() => this.props.onBook(this.props.id)} className="btn btn-primary mt-2">Book</button>
                </div>
            </div>
       
                
         );
    }
}
 
export default Room;