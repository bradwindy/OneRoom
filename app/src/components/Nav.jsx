import React, {Component} from 'react';

class Nav extends Component {
    render() {
        return (
            <header className="navbar fixed-bottom navbar-expand navbar-light bg-light flex-column flex-md-row bd-navbar">
                <div className="navbar-nav-scroll">
                    <ul className="navbar-nav bd-navbar-nav">
                        <li className="nav-item">
                            <a className="navbar-brand" href="/"><b>RoomEase</b></a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-default" href="/login" role="button">Log In</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-success" href="/book" role="button">Book a Room</a>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }
}

export default Nav;