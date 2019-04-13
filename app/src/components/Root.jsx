import React, { Component } from 'react';
import Nav from "./Nav"

class Root extends Component {
    render() {
        return (
            // this is the root component and will always be rendered. Contains the nav element.
            <div>
                <div className="row no-gutters">
                    <div className="col no-gutters">
                        <Nav />
                    </div>
                </div>

                {/* this.props.children is the element that is rendered inside the root element in app.js
                this element depends on the page route. So if you were visiting /login , the login element will be
                passed here and then displayed*/}
                <div className="row no-gutters">
                    <div className="col no-gutters">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Root;


