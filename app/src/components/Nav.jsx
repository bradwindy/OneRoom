import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';


class Nav extends Component {

    static logout() {
        // Stopping the browser from reloading the page
        //event.preventDefault();
        localStorage.removeItem('jwtToken');// remove stored local storage JWT token
        window.location.href = "/login";
    };

    render() {
        let regexBook = /\/book.+/g;
        let regexRooms = /\/rooms/g;
        let url = this.props.location.pathname.toString();

        let logButton = (
            <a className="btn btn-info mr-2" href="/login" role="button">Log In</a>
        );

        let bookButton = (
            <div>
            </div>
        );

        if (localStorage.getItem('jwtToken') !== null) {
            logButton = (<button className="btn btn-outline-danger mr-2" onClick={Nav.logout}>Log Out</button>);
            bookButton = (<a className="btn btn-success" href="/book/date" role="button">Book a Room</a>);

        } else {
            logButton = (<a className="btn btn-info mr-2" href="/login" role="button">Log In</a>);
            bookButton = (<div>
            </div>);
        }


        if (url.match(regexBook) || url.match(regexRooms)) {
            return (
                <header
                    className="navbar fixed-bottom navbar-expand navbar-light bg-light flex-column flex-md-row bd-navbar">
                    <div className="navbar-nav-scroll">
                        <ul className="navbar-nav bd-navbar-nav">
                            <li className="nav-item">
                                <a className="navbar-brand" href="/"><b>RoomEase</b></a>
                            </li>
                            <li className="nav-item">
                                {logButton}
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-primary" href="/" role="button">Home</a>
                            </li>
                        </ul>
                    </div>
                </header>
            );
        } else {
            // noinspection HtmlUnknownTarget
            return (
                // nav bar component, will update later on to dynamically render its elements depending on if the user is
                // logged in or not.
                <header
                    className="navbar fixed-bottom navbar-expand navbar-light bg-light flex-column flex-md-row bd-navbar">
                    <div className="navbar-nav-scroll">
                        <ul className="navbar-nav bd-navbar-nav">
                            <li className="nav-item">
                                <a className="navbar-brand" href="/"><b>RoomEase</b></a>
                            </li>
                            <li className="nav-item">
                                {logButton}
                            </li>
                            <li className="nav-item">
                                {bookButton}
                            </li>
                        </ul>
                    </div>
                </header>
            );
        }
    }
}

export default withRouter(Nav);