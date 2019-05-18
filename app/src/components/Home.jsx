import React, {Component} from 'react';

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

        if (bookingArr == null) {
            bookingArr = [];
        }

        this.setState({bookings: bookingArr})
    };

    cancelBooking = async (bookingId) => {
        this.props.removeBookingFunc(bookingId);

        /*await axios.delete(`https://jsonplaceholder.typicode.com/users/${bookingId}`)
            .then(res => {
                console.log(res);
            });*/

        window.location.reload();
    };

    cancelConfirm = () => {

    };

    render() {
        if (this.state.bookings === undefined || this.state.bookings.length === 0) {
            return (
                <div className="container pt-4 p-2">
                    <h2 className="pl-3 pb-1 pt-2 font-weight-bold">My Bookings:</h2>
                    <h4 className="pl-3 pb-3 pt-2">You currently have no bookings.</h4>
                </div>
            );

        } else {
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
                                        <b>Time: </b>{booking.time}
                                    </li>
                                    <li>
                                        <b>Room: </b>{booking.bookingRoomName}
                                    </li>
                                </ul>

                                <div className="row m-0">
                                    <button className="btn btn-danger float-right" onClick={() => {
                                        // noinspection JSIgnoredPromiseFromCall
                                        this.cancelBooking(booking.bookingId)
                                    }}>Cancel
                                    </button>
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
