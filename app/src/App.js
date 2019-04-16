import React, { Component } from 'react';
import './App.css';

import Root from "./components/Root"
import Home from "./components/Home"
import Login from "./components/Login"
import Book from "./components/Book"
import Register from "./components/Register"
import Rooms from "./components/Rooms"

import { BrowserRouter, Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        // this is the browser router, and it displays a different react component depending on where the user
        // is within the web page.
        <BrowserRouter>
            <Root>
                <Route exact path={"/"} component={Home}/>
                <Route path={"/login/"} component={Login}/>
                <Route path={"/book/"} component={Book}/>
                <Route path={"/register/"} component={Register}/>
                <Route path={"/rooms/"} component={Rooms}/>
            </Root>
        </BrowserRouter>

    );
  }
}

export default App;
