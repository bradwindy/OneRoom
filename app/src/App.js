import React, { Component } from 'react';
import './App.css';

import Root from "./components/Root"
import Home from "./components/Home"
import Login from "./components/Login"
import Book from "./components/Book"

import { BrowserRouter, Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <Root>
                <Route exact path={"/"} component={Home}/>
                <Route path={"/login/"} component={Login}/>
                <Route path={"/book/"} component={Book}/>
            </Root>
        </BrowserRouter>

    );
  }
}

export default App;
