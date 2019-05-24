import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


class Nav extends Component {

    static logout() {
        // Stopping the browser from reloading the page
        //event.preventDefault();
        localStorage.removeItem('jwtToken');// remove stored local storage JWT token
        window.location.href = "/login";
    };

    render() {
        // Regex's to render a blank nav bar on pages where the menu is not needed
        let regexLogin = /\/login/g;
        let regexThanks = /\/thanks/g;
        let regexReg = /\/register/g;

        let url = this.props.location.pathname.toString();

        if (!url.match(regexLogin) && !url.match(regexThanks) && !url.match(regexReg)) {
            return (
                /******* This here is the  fixed navigation bar at the top of the page that hides. If the user is logged in too.
                 */

                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark fixed-bottom peach-gradient">
                        <a className="navbar-brand font-weight-bold text-white" href="/">
                            OneRoom
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
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarNavAltMarkup"
                        >
                            <div className="navbar-nav">
                                <a className="nav-item nav-link" href="/">
                                    My Bookings
                                </a>

                                <a className="nav-item nav-link" href="/login" onClick={Nav.logout}>
                                    Log Out{" "}
                                </a>
                            </div>
                        </div>
                    </nav>
                </header>
            );
        } else {
            // noinspection HtmlUnknownTarget
            return (
                <header>
                    <nav className="navbar navbar-light navbar-dark fixed-bottom peach-gradient">
                        <a className="navbar-brand font-weight-bold text-white" href="/">
                            OneRoom
                        </a>
                    </nav>
                </header>
            );
        }
    }
}

export default withRouter(Nav);