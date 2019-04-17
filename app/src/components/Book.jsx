import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import DatePicker, { DateInput, TimeInput } from '@trendmicro/react-datepicker';
import '@trendmicro/react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';

class Book extends Component {
    state = {
        text: "Hello",
        date: moment().format('YYYY-MM-DD')
    };

    // make this callback universal for each page, not just for date.
    myCallback = (dataFromChild) => {
        this.setState({ date: dataFromChild });
    };

    render() {
        return (
            <div className="p-4">
                <Route
                    path={`${this.props.match.path}`}
                    render={(props) =>
                        <BookNav
                            {...props}
                            parentState={this.state}
                            callbackFromParent={this.myCallback}
                        />
                    }
                />
                <Route
                    path={`${this.props.match.path}:bookPage`}
                    render={(props) =>
                        <BookPage
                            {...props}
                            parentState={this.state}
                            callbackFromParent={this.myCallback}
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

        if (page === 'date'){
            return (
                <div className="container align-middle">
                    <div className="row justify-content-center align-items-center no-gutters">
                        <h1 className="font-weight-bold mb-4 mt-4 pt-4">Select Date</h1>
                        <DatePicker className="pb-4"
                                    date={this.props.parentState.date}
                                    onSelect={date => {
                                        this.props.callbackFromParent(date);
                                    }}
                        />

                        <h4>{this.props.parentState.date}</h4>
                    </div>
                </div>
            );
        } else if (page === 'time'){
            return (
                <div className="container">
                    <form className="form-vertical m-4" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <h1 className="pt-4"><b>Select Time</b></h1>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="time-select" className="col-sm-2 col-form-label">Time:</label>
                            <div className="col-sm-10">
                                <select className="custom-select" id="time-select">
                                    <option selected>8:00am</option>
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
                            <label htmlFor="duration-select" className="col-sm-2 col-form-label">Duration:</label>
                            <div className="col-sm-10">
                                <select className="custom-select" id="duration-select">
                                    <option selected>1 Hour</option>
                                    <option value="1">2 Hours</option>
                                    <option value="2">3 Hours</option>
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
        return(
            <div className="container align-middle">
                <div className="row col-sm-2 fixed-bottom p-3 pb-5 mb-5 justify-content-center align-items-center no-gutters">
                    {/*Will need to make the link below go back to the previous page and always be consistent*/}
                    <button onClick={this.props.history.goBack} className="btn btn-outline-primary font-weight-bold mr-3">Back</button>
                    <h4 className="mr-2">----</h4>
                    {/*Same with this button, next page rather than specific page, have a variable generated
                    depending this.props.match.params.bookPage in render(), which contains next page and then added to
                    this url instead of /time }*/}
                    <Link to={`${this.props.match.url}/time`} className="btn btn-primary font-weight-bold">Next</Link>
                </div>
            </div>
        );
    }
}

export default Book;