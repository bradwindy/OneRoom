import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <div className="container pt-4">

                <form className="form-vertical m-4">
                    <div className="form-group">
                        <div className="col-sm-10">
                            <h1 className="pt-4"><b>Log In</b></h1>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail3" placeholder="Email"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox"/> Remember me
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-5">
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </div>
                        <div className="col-sm-offset-2 col-sm-5">
                        <a className="btn btn-default" href="/register" role="button">Register</a>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;