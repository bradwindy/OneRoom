import React, { Component } from 'react';
import axios from 'axios';
import SweetAlert from 'sweetalert2-react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            interpretedAlert: null,
        };

        // This binding is necessary to make `this` work in the callback
        this.cancelBooking = this.cancelBooking.bind(this);
        this.cancelConfirm = this.cancelConfirm.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount = () => {
        let bookingArr = JSON.parse(localStorage.getItem('bookingArray'));

        if(bookingArr == null) {
            bookingArr = [];
        }

        this.setState({bookings: bookingArr})
    };

    cancelBooking = (bookingId) => {
        console.log(this.props.parentState);
    };

    cancelConfirm = (bookingId) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${bookingId}`)
            .then(res => {
                console.log(res);
            });

        this.setState({ interpretedAlert: null });

        console.log("Bef reload");

        window.location.reload();
    };

    render() {
        if(this.state.bookings === undefined || this.state.bookings.length === 0){
            return(
                <div className="container pt-4 p-2">
                    <h2 className="pl-3 pb-1 pt-2 font-weight-bold">My Bookings:</h2>
                    <h4 className="pl-3 pb-3 pt-2">You currently have no bookings.</h4>
                </div>
            );

        }else{
            console.log(this.state.bookings);
            return (
                // "Home" component, a scrollable list of cards with booking info and buttons. Just example info for now
                <div className="container pt-4 p-2">
                    <h2 className="pl-3 pb-3 pt-2 font-weight-bold">My Bookings:</h2>

                    {this.state.bookings.map(booking =>

                        <div className="card m-2" key={booking.bookingId}>
                            <div className="card-block m-4">
                                <h4 className="card-title"><b>{booking.bookingName}</b></h4>
                                <ul className="card-text list-unstyled">
                                    <li>
                                        <b>Date: </b>{booking.bookingDate}
                                    </li>
                                    <li>
                                        <b>Time: </b>{booking.startTime}
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
                                            {/* TODO The room info link below will link to elora's room info page for the room associated with booking */}
                                            <a className="dropdown-item" href="">Room Info</a>
                                        </div>
                                    </div>
                                    <button className="btn btn-danger float-right" onClick={() => {this.cancelBooking(booking._id)}}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    }
}

export default Home;
