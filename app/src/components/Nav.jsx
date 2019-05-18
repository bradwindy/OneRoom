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
        if (url.match(regexBook) || url.match(regexRooms)) {
            return (
              <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <a className="navbar-brand" href="/">
                    RoomEase
                  </a>
                  <button
                    class="navbar-toggler"
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
                      <a class="nav-item nav-link active" href="/login">
                        Login <span class="sr-only">(current)</span>
                      </a>
                      <a class="nav-item nav-link" href="/">
                        Features
                      </a>
                      <a class="nav-item nav-link" href="/">
                        Pricing
                      </a>
                      <a
                        class="nav-item nav-link disabled"
                        href="/"
                      >
                        Disabled
                      </a>
                    </div>
                  </div>
                </nav>
              </header>

              /*<ul className="navbar-nav bd-navbar-nav">
                            <li className="nav-item">
                                
                            </li>
                            <li className="nav-item nav-link active">
                                <a className="btn btn-outline-secondary mr-2" href="/login" role="button">Log In</a>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-danger mr-2" onClick={Nav.logout}>Log Out</button>
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-primary" href="/" role="button">Home</a>
                            </li>
                        </ul>
                    </div>
                    </nav>
                </header>*/
            );
        } else {
            // noinspection HtmlUnknownTarget
            return (
                // nav bar component, will update later on to dynamically render its elements depending on if the user is
                // logged in or not.
                <header
                    className="navbar navbar-expand navbar-light bg-light ">
                    <div className="navbar-nav-scroll">
                        <ul className="navbar-nav bd-navbar-nav">
                            <li className="nav-item">
                                <a className="navbar-brand" href="/"><b>RoomEaseImg</b></a>
                            </li>
                            <li className="nav-item nav-link active">
                                <a className="btn btn-outline-secondary mr-2" href="/login" role="button">Log In</a>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-outline-danger mr-2" onClick={Nav.logout}>Log Out</button>
                            </li>
                            <li className="nav-item">
                                <a className="btn btn-success" href="/book/date" role="button">Book</a>
                            </li>
                        </ul>
                    </div>
                </header>
            );
        }
    }
}

export default withRouter(Nav);