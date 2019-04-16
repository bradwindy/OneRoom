import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import moment from 'moment';
import DatePicker, { DateInput, TimeInput } from '@trendmicro/react-datepicker';
import '@trendmicro/react-datepicker/dist/react-datepicker.css';

class Book extends Component {
    state = {
        text: "Hello",
        date: moment().format('YYYY-MM-DD')
    };

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
        console.log(page);

        if(page === 'date'){
            return (
                <div>
                    <DatePicker className="pb-4"
                                date={this.props.parentState.date}
                                onSelect={date => {
                                    this.props.callbackFromParent(date);
                                }}
                    />

                    <h4>{this.props.parentState.date}</h4>
                    <h4>{this.props.match.params.bookPage}</h4>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Time picker can go here</p>
                </div>
            );
        }


    }
}

class BookNav extends Component{
    render() {
        return(
            <div className="container align-middle">
                <div className="row col-sm-2 fixed-bottom p-3 pb-4 mb-5 justify-content-center align-items-center no-gutters">
                    {/*Will need to make the link below go back to the previous page in menu, rather than just the home page*/}
                    <Link to={`/`} className="btn btn-outline-primary font-weight-bold mr-3">Back</Link>
                    <h4 className="mr-2">Choose:</h4>
                    {/*Same with this button, next page rather than specific page*/}
                    <Link to={`${this.props.match.url}/time`} className="btn btn-primary font-weight-bold">Next</Link>
                </div>
            </div>
        );
    }
}

export default Book;