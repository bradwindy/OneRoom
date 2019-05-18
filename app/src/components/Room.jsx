import React, {Component} from 'react';

class Room extends Component {

    render() {
        return (
            <div className="card m-2">
                <img src="" className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">`Room: ${this.props.room.name}`</h5>
                    <p className="card-text">`Room Capacity: ${this.props.room.capacity}`</p>
                    <a href="/" className="btn btn-primary">Learn more</a>
                </div>
            </div>


        );
    }
}

//export default Room;