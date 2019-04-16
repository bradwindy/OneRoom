import React, {Component} from 'react';

class NoMatch extends Component {
    render() {
        return (
            <div className="container">
                <div className="container align-middle p-4">
                    <div className="row pt-4 justify-content-center align-items-center pb-2">
                        <h1 className="font-weight-bold display-1 mb-0">
                            404
                        </h1>
                    </div>

                    <div className="row justify-content-center align-items-center">
                        <h2 className="font-weight-bold display-4 text-danger">
                            Oops!
                        </h2>
                    </div>
                    <div className="pl-4 pr-4 row justify-content-center align-items-center pt-2">
                        <h4 className="font-weight-bold text-center pl-4 pr-4 text-secondary">
                            You have requested a page or item that doesn't exist!
                        </h4>
                    </div>
                    <div className="pl-4 pr-4 row justify-content-center align-items-center pt-4">
                        <a className="btn btn-primary font-weight-bold" href="/" role="button">Go back Home</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NoMatch;