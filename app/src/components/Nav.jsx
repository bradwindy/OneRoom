import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


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
            bookButton = (
                <a className="btn btn-success" href="/book/date" role="button"><FontAwesomeIcon icon="plus"/> Book</a>);

        } else {
            logButton = (<a className="btn btn-info mr-2" href="/login" role="button">Log In</a>);
            bookButton = (<div>
            </div>);
        }

        if (url.match(regexBook) || url.match(regexRooms)) {
            return (
                /******* This here is the  fixed naviagtion bar at the top of the page that hides. 
              <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <a className="navbar-brand" href="/">
                  
                    RoomEase
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon" />
                  </button>
                  <div
                    class="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                  >
                    <div class="navbar-nav">
                      <a class="nav-item nav-link" href="/login">
                        Login <span class="sr-only">(current)</span>
                      </a>
                      <a class="nav-item nav-link" href="/">
                        My Bookings
                      </a>
                      <a class="nav-item nav-link" href="/book/date">
                        Book <span className="sr-only">(current)</span>
                      </a>
                      <a class="nav-item nav-link" href="/login" onClick={Nav.logout}>
                        Logout <span className="sr-only">(current)</span>
                      </a>*/
                      
                      
                <header
                    className="navbar fixed-bottom navbar-expand navbar-light bg-light flex-column flex-md-row bd-navbar">
                    <div className="navbar-nav-scroll">
                        <ul className="navbar-nav bd-navbar-nav">
                            <li className="nav-item">
                                <a className="navbar-brand" href="/">RoomEase</a>
                            </li>
                            <li className="nav-item">
                                {logButton}
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-primary" href="/" role="button"><FontAwesomeIcon
                                    icon="list"/> Bookings</a>
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
                                <a className="navbar-brand" href="/">RoomEase</a>
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