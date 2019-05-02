import React, { Component } from 'react';
import axios from 'axios';


class Home extends Component {
    state = {
        users: []
    };

    componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
                const users = res.data;
                this.setState({ users });
            })
    };

    cancelBooking = (bookingId) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${bookingId}`)
            .then(res => {
                console.log(res);
            })
    };

    render() {
        return (
            // "Home" component, a scrollable list of cards with booking info and buttons. Just example info for now
            <div className="container pt-4 p-2">
                <h2 className="pl-3 pb-3 pt-2"><b>My Bookings:</b></h2>

                {this.state.users.map(user =>

                    <div className="card-columns m-2" key={user.id}>
                        <div className="card">
                            <div className="card-block m-4">
                                <h4 className="card-title"><b>{user.name}</b></h4>
                                <ul className="card-text list-unstyled">
                                    <li>
                                        <b>Email: </b>{user.email}
                                    </li>
                                    <li>
                                        <b>Website: </b>{user.website}
                                    </li>
                                    <li>
                                        <b>Phone: </b>{user.phone}
                                    </li>
                                </ul>

                                <div className="row m-0">
                                    <button className="btn btn-primary mr-2">Find Room</button>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle mr-2" type="button"
                                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                            More
                                        </button>

                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a href={"http://www.google.com/maps/place/"+ user.address.geo.lat + "," + user.address.geo.lng} className="dropdown-item">Building Directions</a>
                                            {/* TODO The room info link below will link to elora's room info page for the room associated with booking */}
                                            <a className="dropdown-item" href="">Room Info</a>
                                        </div>
                                    </div>
                                    <button className="btn btn-danger float-right" onClick={() => {this.cancelBooking(user.id)}}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Home;
