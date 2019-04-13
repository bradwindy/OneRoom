import React, { Component } from 'react';
import axios from 'axios';
import FormValidator from './FormValidator';


class Login extends Component {
    state = {
        email: '',
        password: '',
    };

    passwordMatch = (confirmation, state) => (state.password === confirmation);

    /** Takes the value of anything that is typed by the user for the form fields
    * and sets the state for the form field above.
    * Source - https://reactjs.org/docs/forms.html
    */

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    /** HandleSubmit is triggered when the sign up form is submitted */
    handleSubmit = event => {
        // Stopping the browser from reloading the page
        event.preventDefault();
        // Making a new object called userLogin which takes all the inputted form details
        const userLogin = {
            email: this.state.email,
            password: this.state.password,
        };

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid) {
            /** Using Axios to POST this to our /API/Login and passing the userLogin object as a payload */
            axios.post('/api/login', { userLogin })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                });
        }else{
            this.formClassName = "form-control is-invalid";
        }
    };

    constructor(props) {
        super(props);

        this.validator = new FormValidator([
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Email is required.'
            },
            {
                field: 'password',
                method: 'isEmpty',
                validWhen: false,
                message: 'Password is required.'
            }
        ]);

        this.submitted = false;

        this.formClassName = "form-control";

        this.state = {
            email: '',
            password: '',
            validation: this.validator.valid(),
        };
    };


    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        return (
            // log in page
            <div className="container p-4">

                <form className="form-vertical m-4" onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <h1 className="pt-4"><b>Log In</b></h1>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email"
                                   className={this.formClassName}
                                   id="inputEmail3"
                                   placeholder="example123@student.otago.ac.nz"
                                   name="email"
                                   onChange={this.handleChange} />

                            <small id="" className="form-text text-muted pl-1">
                                You must use an Otago University email address.
                            </small>
                            <small id="" className="form-text text-danger pl-1">
                                {validation.email.message}
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password"
                                   className={this.formClassName}
                                   id="inputPassword3"
                                   placeholder="Password"
                                   name="password"
                                   onChange={this.handleChange}
                            />
                            <small id="" className="form-text text-danger pl-1">
                                {validation.password.message}
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-2">
                        </div>
                        <div className="col-sm-10 pl-3 mb-0">
                            <div className="checkbox">
                                <label className="mb-0">
                                    <input type="checkbox" /> Remember me
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-2">
                        </div>
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Log in</button>
                            <a className="btn btn-outline-secondary ml-2" href="/register" role="button">Register</a>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;