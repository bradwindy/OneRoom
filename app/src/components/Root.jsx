import React, { Component } from 'react';
import Nav from "./Nav"

class Root extends Component {
    render() {
        return (
            <div>
                <div className="row no-gutters">
                    <div className="col no-gutters">
                        <Nav />
                    </div>
                </div>

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


