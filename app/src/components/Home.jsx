import React, {Component} from "react";
import Background from "../images/background_two.png";
import BackgroundTwo from "../images/background_three.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            interpretedAlert: null
        };

        // This binding is necessary to make `this` work in the callback
        this.cancelBooking = this.cancelBooking.bind(this);
        this.cancelConfirm = this.cancelConfirm.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount = () => {
        let bookingArr = JSON.parse(localStorage.getItem("bookingArray"));

        if (bookingArr == null) {
            bookingArr = [];
        }

        this.setState({bookings: bookingArr});
    };

    cancelBooking = async (bookingId, roomId) => {
        this.props.removeBookingFunc(bookingId);

        await axios.delete(`/booking/deleteBooking/` + roomId + '/' + bookingId)
            .then(res => {
                console.log(res);
            });

        window.location.reload();
    };

    cancelConfirm = () => {
    };

    render() {
        if (localStorage.getItem('jwtToken') === null) {
            window.location.href = "/login";
        }

        if (this.state.bookings === undefined || this.state.bookings.length === 0) {
            return (
                <div
                    className="container pt-4 p-2"
                    style={{
                        backgroundImage: "url(" + Background + ")",
                        backgroundPosition: "bottom center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "60%",
                        height: "700px"
                    }}
                >


                    <div className="card text-center">

                        <div className="card-body">
                            <h5 className="card-title">You currently have no bookings.</h5>
                            <p className="card-text">
                                Don't miss out! Book your room now.
                            </p>
                            <a href="/book/date" className="btn btn-primary">
                                Book Room
                            </a>
                        </div>

                    </div>
                </div>
            );
        } else {
            return (
                // "Home" component, a scrollable list of cards with booking info and buttons. Just example info for now
                <div
                    className="container pt-4 p-2"
                    style={{
                        backgroundImage: "url(" + BackgroundTwo + ")",
                        backgroundPosition: "bottom center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "90%",
                        height: "700px"
                    }}
                >
                    <h2 className="pl-3 pb-3 pt-2 font-weight-bold">My Bookings:</h2>

                    {this.state.bookings.map(booking => (
                        <div className="card m-2" key={booking.bookingId}>
                            <div className="card-block m-4">
                                <h4 className="card-title">
                                    <b>{booking.bookingName}</b>
                                </h4>
                                <ul className="card-text list-unstyled">
                                    <li>
                                        <b>Date: </b>
                                        {booking.bookingDate}
                                    </li>
                                    <li>
                                        <b>Time: </b>
                                        {booking.time}
                                    </li>
                                    <li>
                                        <b>Room: </b>
                                        {booking.bookingRoomName}
                                    </li>
                                </ul>

                                <div className="row m-0">
                                    <button
                                        className="btn btn-sm btn-outline-danger float-right"
                                        onClick={() => {
                                            // noinspection JSIgnoredPromiseFromCall
                                            this.cancelBooking(booking.bookingId, booking.roomId);
                                        }}
                                    >
                                        <FontAwesomeIcon icon="times"/> Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default Home;
