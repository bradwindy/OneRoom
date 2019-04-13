import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            // "Home" component, a scrollable list of cards with booking info and buttons. Just example info for now
            <div className="container pt-4 p-2">
                <h2 className="pl-3 pb-3 pt-2"><b>My Bookings:</b></h2>
                <div className="card-columns m-2">
                    <div className="card">
                        <div className="card-block m-4">
                            <h4 className="card-title"><b>Study Group</b></h4>
                            <ul className="card-text list-unstyled">
                                <li>
                                    <b>Date: </b>Mon 11th September
                                </li>
                                <li>
                                    <b>Time: </b>9:00am - 11:00am
                                </li>
                                <li>
                                    <b>Location: </b>Room 12
                                </li>
                            </ul>


                            <a href="#" className="btn btn-primary mr-2">Directions</a>
                            <a href="#" className="btn btn-secondary">More</a>
                            <a href="#" className="btn btn-danger float-right">Cancel</a>
                        </div>
                    </div>
                </div>

                <div className="card-columns m-2">
                    <div className="card">
                        <div className="card-block m-4">
                            <h4 className="card-title"><b>310 Meeting</b></h4>
                            <ul className="card-text list-unstyled">
                                <li>
                                    <b>Date: </b>Tue 12th September
                                </li>
                                <li>
                                    <b>Time: </b>8:00pm - 9:00pm
                                </li>
                                <li>
                                    <b>Location: </b>Room 2
                                </li>
                            </ul>


                            <a href="#" className="btn btn-primary mr-2">Directions</a>
                            <a href="#" className="btn btn-secondary">More</a>
                            <a href="#" className="btn btn-danger float-right">Cancel</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
