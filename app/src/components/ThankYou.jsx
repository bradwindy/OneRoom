import React, {Component} from 'react';

class ThankYou extends Component {
    render() {
        return (
            <div className="container">
                <div className="container align-middle p-4">
                    <div className="row justify-content-center align-items-center">
                        <h2 className="font-weight-bold display-4 pt-4 mt-4">
                            Thanks :)
                        </h2>
                    </div>
                    <div className="pl-4 pr-4 row justify-content-center align-items-center pt-2">
                        <h4 className="font-weight-bold text-center pl-4 pr-4 text-secondary">
                            Thank you for registering with Roomease
                        </h4>
                    </div>
                    <div className="pl-4 pr-4 row justify-content-center align-items-center pt-4">
                        <a className="btn btn-primary" href="/login" role="button">Proceed to Log In</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ThankYou;