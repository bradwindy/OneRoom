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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingArray: [],
        };

        this.bookingArrayAdd = this.bookingArrayAdd.bind(this);
        this.bookingArrayRem = this.bookingArrayRem.bind(this);
    };

    bookingArrayAdd = (newBooking) => {
        let bookingArr = JSON.parse(localStorage.getItem('bookingArray'));

        if (bookingArr === null) {
            bookingArr = [];
        }

        let joined = bookingArr.concat([newBooking]);
        localStorage.setItem('bookingArray', JSON.stringify(joined));
    };

    bookingArrayRem = (bookingIDRemove) => {
        let bookingArr = JSON.parse(localStorage.getItem('bookingArray'));

        for (let index = 0; index < bookingArr.length; ++index) {
            if (bookingArr[index].bookingId === bookingIDRemove) {
                console.log(bookingArr[index]);
                bookingArr.splice(index, 1);
            }
        }

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
