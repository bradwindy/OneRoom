import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import moment from 'moment';
import DatePicker from '@trendmicro/react-datepicker';
import '@trendmicro/react-datepicker/dist/react-datepicker.css';

class Book extends Component {

    // constructor for book page
    constructor(props) {
        super(props);

        // setting the state, timePos is the selected position in the drop down menu, duration is the same, see below
        this.state = {
            date: moment().format('YYYY-MM-DD'),
            timePos: 0,
            duration: 1,
            name: "",
        };
    }

    // Because of the routing and componentisation of this booking page. It is necessary to have a callback function
    // This callback function takes data from the "child" (the function that calls it), and depending on the page and field,
    // Sets the state accordingly. This cannot be done within each routed component, and so a callback function is passed instead
    callback = (dataFromChild, fieldNum, pageName) => {
        if (pageName === "date") {
            this.setState({date: dataFromChild});
        } else if (pageName === "time") {
            if (fieldNum === 0) {
                this.setState({timePos: dataFromChild});
            } else if (fieldNum === 1) {
                this.setState({duration: dataFromChild});
            }
        } else if (pageName === "name") {
            this.setState({name: dataFromChild});
        }
    };

    // Renders the Booking pages.
    // There is one route for the /book path. This renders the nav buttons that are on each page.
    // The other route renders the date and time pickers above nav.
    render() {
        return (
            <div className="p-4">
                <Route
                    path={`${this.props.match.path}`}
                    render={(props) =>
                        <BookNav
                            {...props}
                            // This is where we can pass values or functions to a rendered component
                            parentState={this.state}
                            callbackFromParent={this.callback}
                            searchFunc={this.roomRequest}
                        />
                    }
                />
                <Route
                    path={`${this.props.match.path}:bookPage`}
                    render={(props) =>
                        <BookPage
                            {...props}
                            // This is where we can pass values or functions to a rendered component
                            parentState={this.state}
                            callbackFromParent={this.callback}
                        />
                    }
                />
            </div>
        );
    }
}

class BookPage extends Component {
    render() {
        const page = this.props.match.params.bookPage;

        // conditional rendering of the content of the page depending on the URL
        if (page === 'date') {
            return (
                <div className="container">
                    <div className="row justify-content-center align-items-center no-gutters">
                        <h2 className="pl-3 pb-3 pt-4 mt-2 font-weight-bold">Select Date:</h2>
                        <DatePicker className="pb-4"
                                    date={this.props.parentState.date}
                                    onSelect={date => {
                                        // On a change of date, run callback method to update state
                                        this.props.callbackFromParent(date, 0, page);
                                    }}
                        />
                    </div>
                </div>
            );
        } else if (page === 'time') {
            return (
                <div className="container">
                    <form className="form-vertical m-4" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <div className="col-sm-10 p-0">
                                <h2 className="pl-3 mt-2 font-weight-bold">Select Time:</h2>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="time-select"
                                   className="col-sm-2 col-form-label font-weight-bold">Time:</label>
                            <div className="col-sm-10">
                                <select
                                    defaultValue={this.props.parentState.timePos}
                                    className="custom-select"
                                    id="time-select"
                                    // On a change of time, run callback method to update state
                                    onChange={(event) => this.props.callbackFromParent(event.target.value, 0, page)}
                                >
                                    <option value="0">8:00am</option>
                                    <option value="1">9:00am</option>
                                    <option value="2">10:00am</option>
                                    <option value="3">11:00am</option>
                                    <option value="4">12:00pm</option>
                                    <option value="5">1:00pm</option>
                                    <option value="6">2:00pm</option>
                                    <option value="7">3:00pm</option>
                                    <option value="8">4:00pm</option>
                                    <option value="9">5:00pm</option>
                                    <option value="10">6:00pm</option>
                                    <option value="11">7:00pm</option>
                                    <option value="12">8:00pm</option>
                                    <option value="13">9:00pm</option>
                                    <option value="14">10:00pm</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="duration-select"
                                   className="col-sm-2 col-form-label font-weight-bold">Duration:</label>
                            <div className="col-sm-10">
                                <select defaultValue={this.props.parentState.duration}
                                        className="custom-select"
                                        id="duration-select"
                                    // On a change of duration, run callback method to update state
                                        onChange={(event) => this.props.callbackFromParent(event.target.value, 1, page)}
                                >
                                    <option value="1">1 Hour</option>
                                    <option value="2">2 Hours</option>
                                    <option value="3">3 Hours</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            );
        } else if (page === 'name') {
            return (
                <div className="container">
                    <form className="form-vertical m-4" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <div className="col-sm-10 p-0">
                                <h2 className="pl-3 mt-2 font-weight-bold">Name Booking:</h2>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="time-select"
                                   className="col-sm-2 col-form-label font-weight-bold">Time:</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       id="name"
                                       placeholder="Booking Name"
                                       name="bookingName"
                                       value={this.props.parentState.name}
                                       onChange={(event) => this.props.callbackFromParent(event.target.value, 0, page)}

                                />
                            </div>
                        </div>

                    </form>
                </div>
            );
        }
    }
}

class BookNav extends Component {
    render() {
        const pageURL = this.props.location.pathname;
        let nextPath = "";
        let pageNum = "of 3";

        // Here is conditional rendering of the navigation buttons depending on the URL
        if (pageURL === "/book/date") {
            nextPath = this.props.match.url + "/time";
            return this.navButtons(nextPath, "Page 1 " + pageNum);
        } else if (pageURL === "/book/time") {
            nextPath = this.props.match.url + "/name";
            return this.navButtons(nextPath, "Page 2 " + pageNum);
        } else if (pageURL === "/book/name") {
            return this.searchNavButtons("Page 3 " + pageNum);
        }
    }

    // This is the function that returns the navigation buttons for the date page.
    navButtons(nextPath, pageNumber) {
        return (
            <div className="container align-middle">
                <div
                    className="row col-sm-2 fixed-bottom p-3 pb-5 mb-5 justify-content-center align-items-center no-gutters">
                    {/*Will need to make the link below go back to the previous page and always be consistent*/}
                    <button onClick={this.props.history.goBack}
                            className="btn btn-outline-primary font-weight-bold mr-3">Back
                    </button>
                    <p className="mr-2 mb-0">{pageNumber}</p>
                    {/*Same with this button, next page rather than specific page, have a variable generated
                    depending this.props.match.params.bookPage in render(), which contains next page and then added to
                    this url instead of /time }*/}
                    <Link to={`${nextPath}`} className="btn btn-primary font-weight-bold">Next</Link>
                </div>
            </div>
        );
    };

    // This is the function that returns the navigation buttons for the time page with a search button instead of a next button.
    searchNavButtons(pageNumber) {
        return (
            <div className="container align-middle">
                <div
                    className="row col-sm-2 fixed-bottom p-3 pb-5 mb-5 justify-content-center align-items-center no-gutters">
                    {/*Will need to make the link below go back to the previous page and always be consistent*/}
                    <button onClick={this.props.history.goBack}
                            className="btn btn-outline-primary font-weight-bold mr-3">Back
                    </button>
                    <p className="mr-2 mb-0">{pageNumber}</p>
                    {/*Same with this button, next page rather than specific page, have a variable generated
                    depending this.props.match.params.bookPage in render(), which contains next page and then added to
                    this url instead of /time }*/}
                    <Link className="btn btn-primary font-weight-bold" to={{
                        pathname: '/rooms',
                        data: this.props.parentState,
                    }}>Search</Link>
                </div>
            </div>
        );
    };
}

export default Book;