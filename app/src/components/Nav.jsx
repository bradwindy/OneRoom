import React, {Component} from 'react';


class Nav extends Component {

    logout = event => {
        // Stopping the browser from reloading the page
        //event.preventDefault();
        localStorage.removeItem('jwtToken')// remove stored local storage JWT token 
        window.location.href = "/login";
    };

    render() {
        // noinspection HtmlUnknownTarget
        return (
            // nave bar component, will update later on to dynamically render its elements depending on if the user is
            // logged in or not.
            <header className="navbar fixed-bottom navbar-expand navbar-light bg-light flex-column flex-md-row bd-navbar">
                <div className="navbar-nav-scroll">
                    <ul className="navbar-nav bd-navbar-nav">
                        <li className="nav-item">
                            <a className="navbar-brand" href="/"><b>RoomEase</b></a>
                        </li>

                        <li className="nav-item">
                            <a className="btn btn-outline-secondary mr-2" href="/login" role="button">Log In</a>
                        </li>

                        <li className="nav-item">
                            <a className="btn btn-success mr-2" href="/book/date" role="button">Book Room</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-danger" onClick={this.logout} role="button">Log Out</a>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }
}

export default Nav;