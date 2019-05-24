import React, {Component} from "react";
import Background from "../images/fogg-no-comments.png";
import BackgroundTwo from "../images/workflow.png";
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

    // Runs when page is mounted/run/rendered
    componentDidMount = () => {
        // Get the booking array from local storage.
        let bookingArr = JSON.parse(localStorage.getItem("bookingArray"));

        // If it is null, as in not current array, replace with an empty array
        if (bookingArr == null) {
            bookingArr = [];
        }

        // set the list of booking in state to that of the array
        this.setState({bookings: bookingArr});
    };

    // Function that cancels booking
    cancelBooking = async (bookingId, roomId) => {
        // execute remove booking function, this is passed to here from App.js using react router.
        this.props.removeBookingFunc(bookingId);

        // Delete booking using axios
        await axios.delete(`/booking/deleteBooking/` + roomId + '/' + bookingId)
            .then(res => {
                //console.log(res);
            });

        // Reload the page to update list of cards
        window.location.reload();
    };

    // Function run on the press of the cancel button. Combines popup confirmation with cancel function
    submitDelete = (bookingId, roomId) => {

        // Custom alert popup
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="card text-center m-2">
                        <div className="card-body">
                            <h5 className="card-title pt-2 font-weight-bold">Confirm Delete</h5>
                            <p className="card-text">
                                Are you sure you want to delete this booking?
                            </p>
                            <button className="btn btn-blue-grey" onClick={onClose}>No</button>
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
        // If there is no JWT token in local storage, the user must not be logged in and so redirect to login page
        if (localStorage.getItem('jwtToken') === null) {
            window.location.href = "/login";
        }

        // If there are no bookings, display a card to inform user, with a button to create a new booking
        if (this.state.bookings === undefined || this.state.bookings.length === 0) {
            return (
                <div
                    className="container mt-2 p-3"
                    style={{
                        backgroundImage: "url(" + Background + ")",
                        backgroundPosition: "bottom center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "92vw",
                        height: "92vh"
                    }}
                >


                    <div className="card text-center m-2">
                        <div className="card-body">
                            <h5 className="card-title pt-2 font-weight-bold">You currently have no bookings.</h5>
                            <p className="card-text">
                                Don't miss out! Book your room now.
                            </p>
                            <a href="/book/date" className="btn peach-gradient font-weight-bold text-white">
                                <FontAwesomeIcon icon="plus"/> Book Room
                            </a>
                        </div>

                    </div>
                </div>
            );

        } else {
            // If there are bookings, maps bookings to a list of cards.
            return (
                // "Home" component, a scrollable list of cards with booking info and buttons. Just example info for now
                <div
                    className="container pt-3 p-2"
                    style={{
                        backgroundImage: "url(" + BackgroundTwo + ")",
                        backgroundPosition: "bottom center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "92vw",
                        height: "92vh"
                    }}
                >
                    <h2 className="pl-3 pb-3 pt-3 font-weight-bold">My Bookings:</h2>

                    {this.state.bookings.map(booking => (
                        <div className="card ml-3 mr-3 mb-2 mt-2" key={booking.bookingId}>
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
                        <a href="/book/date" className="btn peach-gradient text-white font-weight-bold">
                            <FontAwesomeIcon icon="plus"/> Book Another Room
                        </a>
                    </div>
                </div>
            );
        }
    }
}

export default Home;
