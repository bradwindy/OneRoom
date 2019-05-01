import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import DatePicker from '@trendmicro/react-datepicker';
import '@trendmicro/react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

class Book extends Component {

    // constructor for book page
    constructor(props) {
        super(props);

        // setting the state, timePos is the selected position in the drop down menu, duration is the same, see below
        this.state = {
            date: moment().format('YYYY-MM-DD'),
            timePos: 0,
            duration: 1,
        };

        // binding here happens so we can access state within room request method
        this.roomRequest = this.roomRequest.bind(this);
    }

    // Because of the routing and componentisation of this booking page. It is necessary to have a callback function
    // This callback function takes data from the "child" (the function that calls it), and depending on the page and field,
    // Sets the state accordingly. This cannot be done within each routed component, and so a callback function is passed instead
    callback = (dataFromChild, fieldNum, pageName) => {
        if (pageName === "date"){
            this.setState({ date: dataFromChild });
            console.log("Date success " + dataFromChild)
        } else if (pageName === "time"){
            if(fieldNum === 0){
                this.setState({ timePos: dataFromChild });
                console.log("Time Pos success " + dataFromChild)
            }else if (fieldNum === 1){
                this.setState({ duration: dataFromChild });
                console.log("Duration Pos success " + dataFromChild)
            }
        }
    };

    // This method constructs a request object and posts it using axios
    roomRequest(){
        const timeList = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
                          "18:00", "19:00", "20:00", "21:00", "22:00"];

        const request = {date: this.state.date, time: timeList[this.state.timePos], duration: this.state.duration};

        axios.post(`https://jsonplaceholder.typicode.com/users`, request)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
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
        if (page === 'date'){
            return (
                <div className="container align-middle">
                    <div className="row justify-content-center align-items-center no-gutters">
                        <h1 className="font-weight-bold mb-4 mt-4 pt-4">Select Date</h1>
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
                            <div className="col-sm-10">
                                <h1 className="pt-4"><b>Select Time</b></h1>
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
        }
    }
}

class BookNav extends Component{
    render() {
        const pageURL = this.props.location.pathname;
        let nextPath = "";

        // Here is conditional rendering of the navigation buttons depending on the URL
        if (pageURL === "/book/date"){
            nextPath = this.props.match.url + "/time";
            return this.navButtons(nextPath);
        } else if (pageURL === "/book/time"){
            return this.searchNavButtons();
        }
    }

    // This is the function that returns the navigation buttons for the date page.
    navButtons(nextPath){
        return(
            <div className="container align-middle">
                <div className="row col-sm-2 fixed-bottom p-3 pb-5 mb-5 justify-content-center align-items-center no-gutters">
                    {/*Will need to make the link below go back to the previous page and always be consistent*/}
                    <button onClick={this.props.history.goBack} className="btn btn-outline-primary font-weight-bold mr-3">Back</button>
                    <h4 className="mr-2">----</h4>
                    {/*Same with this button, next page rather than specific page, have a variable generated
                    depending this.props.match.params.bookPage in render(), which contains next page and then added to
                    this url instead of /time }*/}
                    <Link to={`${nextPath}`} className="btn btn-primary font-weight-bold">Next</Link>
                </div>
            </div>
        );
    };

    // This is the function that returns the navigation buttons for the time page with a search button instead of a next button.
    searchNavButtons(){
        return(
            <div className="container align-middle">
                <div className="row col-sm-2 fixed-bottom p-3 pb-5 mb-5 justify-content-center align-items-center no-gutters">
                    {/*Will need to make the link below go back to the previous page and always be consistent*/}
                    <button onClick={this.props.history.goBack} className="btn btn-outline-primary font-weight-bold mr-3">Back</button>
                    <h4 className="mr-2">----</h4>
                    {/*Same with this button, next page rather than specific page, have a variable generated
                    depending this.props.match.params.bookPage in render(), which contains next page and then added to
                    this url instead of /time }*/}
                    <button onClick={this.props.searchFunc} className="btn btn-primary font-weight-bold">Search</button>
                </div>
            </div>
        );
    };
}

export default Book;