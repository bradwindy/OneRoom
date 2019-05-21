import React, {Component} from "react";
import Background from "../images/background_two.png";
import BackgroundTwo from "../images/background_three.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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
        this.submitDelete = this.submitDelete.bind(this);
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

    submitDelete = (bookingId, roomId) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="card text-center m-2">
                        <div className="card-body">
                            <h5 className="card-title pt-2 font-weight-bold">Confirm Delete</h5>
                            <p className="card-text">
                                Are you sure you want to delete this booking?
                            </p>
                            <button className="btn btn-primary" onClick={onClose}>No</button>
                            <button className="btn btn-danger font-weight-bold" onClick={() => {
                                this.cancelBooking(bookingId, roomId);
                                onClose();
                            }}
                            >
                                Yes, Delete Booking
                            </button>
                        </div>

                    </div>
                );
            }
        });
    };

    render() {
        if (localStorage.getItem('jwtToken') === null) {
            window.location.href = "/login";
        }

        if (this.state.bookings === undefined || this.state.bookings.length === 0) {
            return (
                <div
                    className="container pt-3 p-2"
                    style={{
                        backgroundImage: "url(" + Background + ")",
                        backgroundPosition: "bottom center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "60%",
                        height: "700px"
                    }}
                >


                    <div className="card text-center m-2">
                        <div className="card-body">
                            <h5 className="card-title pt-2">You currently have no bookings.</h5>
                            <p className="card-text">
                                Don't miss out! Book your room now.
                            </p>
                            <a href="/book/date" className="btn btn-success font-weight-bold">
                                <FontAwesomeIcon icon="plus"/> Book Room
                            </a>
                        </div>

                    </div>
                </div>
            );
        } else {
            return (
                // "Home" component, a scrollable list of cards with booking info and buttons. Just example info for now
                <div
                    className="container pt-3 p-2"
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
                                <h4 className="card-title font-weight-bold">
                                    {booking.bookingName}
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
                                        className="btn btn-sm btn-danger float-right m-0"
                                        onClick={() => {
                                            // noinspection JSIgnoredPromiseFromCall
                                            this.submitDelete(booking.bookingId, booking.roomId);
                                        }}
                                    >
                                        <FontAwesomeIcon icon="times"/> Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="text-center pt-3">
                        <a href="/book/date" className="btn btn-success font-weight-bold">
                            <FontAwesomeIcon icon="plus"/> Book Another Room
                        </a>
                    </div>
                </div>
            );
        }
    }
}

export default Home;
