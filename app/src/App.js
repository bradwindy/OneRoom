import React, {Component} from 'react';
import './App.scss';

import Root from "./components/Root"
import Home from "./components/Home"
import Login from "./components/Login"
import Book from "./components/Book"
import Rooms from "./components/Rooms"
import NoMatch from "./components/NoMatch"
import Register from "./components/Register"
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ThankYou from "./components/ThankYou";
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faChevronLeft,
    faChevronRight,
    faSearch,
    faSignOutAlt,
    faBookmark,
    faPlus,
    faList,
    faUsers,
    faTv,
    faChalkboard,
    faVideo,
    faTimes,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faChevronLeft,
    faChevronRight,
    faSearch,
    faSignOutAlt,
    faBookmark,
    faPlus,
    faList,
    faUsers,
    faTv,
    faChalkboard,
    faVideo,
    faTimes,
    faTrash
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingArray: [],
        };

        this.bookingArrayAdd = this.bookingArrayAdd.bind(this);
        this.bookingArrayRem = this.bookingArrayRem.bind(this);
    };

    // Function that adds booking to local storage
    bookingArrayAdd = (newBooking) => {
        // Get booking array from local storage
        let bookingArr = JSON.parse(localStorage.getItem('bookingArray'));

        // if null, make blank
        if (bookingArr === null) {
            bookingArr = [];
        }

        // join in new booking to array
        let joined = bookingArr.concat([newBooking]);
        // save array back to local storage
        localStorage.setItem('bookingArray', JSON.stringify(joined));
    };

    // Function that removes booking from local storage
    bookingArrayRem = (bookingIDRemove) => {
        // Get booking array from local storage
        let bookingArr = JSON.parse(localStorage.getItem('bookingArray'));

        // Find booking that matches ID and remove
        for (let index = 0; index < bookingArr.length; ++index) {
            if (bookingArr[index].bookingId === bookingIDRemove) {
                bookingArr.splice(index, 1);
            }
        }
        // save array back to local storage
        localStorage.setItem('bookingArray', JSON.stringify(bookingArr));
    };

    render() {
        return (
            // this is the browser router, and it displays a different react component depending on where the user
            // is within the web page.
            <BrowserRouter>
                <Root>
                    <Switch>
                        <Route exact path={"/"}
                               render={(props) =>
                                   <Home
                                       {...props}
                                       // This is where we can pass values or functions to a rendered component
                                       parentState={this.state}
                                       removeBookingFunc={this.bookingArrayRem}
                                   />
                               }
                        />
                        <Route path={"/login/"} component={Login}/>
                        <Route path={"/book/"} component={Book}/>
                        <Route path={"/register/"} component={Register}/>
                        <Route path={"/rooms/"}
                               render={(props) =>
                                   <Rooms
                                       {...props}
                                       // This is where we can pass values or functions to a rendered component
                                       parentState={this.state}
                                       appendBookingFunc={this.bookingArrayAdd}
                                   />
                               }
                        />
                        <Route path={"/thanks/"} component={ThankYou}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </Root>
            </BrowserRouter>

        );
    }
}

export default App;
