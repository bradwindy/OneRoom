/** The Registration or Sign up Page for the User
 *  Provides the user with a sign up form. Then, takes the user input
 *  and converts it into JSON using Axios and sends the POST AJAX
 *  request to the /register API Route.
 *  Source - https://youtu.be/oQnojIyTXb8
 */
import React, { Component } from 'react';
import axios from 'axios';
import FormValidator from "./FormValidator";

class Register extends Component {
    state = {
        username: '',
        studentid: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    };

    /**  Takes the value of anything that is typed by the user for the form fields 
     *   and sets the state for the form field above.
     *   Source - https://reactjs.org/docs/forms.html
     */

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    /** HandleSubmit is triggered when the sign up form is submitted */
    handleSubmit = event => {
        // Stopping the browser from reloading the page
        event.preventDefault();

        // Making a new object called user which takes all the inputted form details
        const user = {
            username: this.state.username,
            studentid: this.state.studentid,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email + "@student.otago.ac.nz",
            password: this.state.password,
        };

        // Calling a validator to validate state on submit
        const validation = this.validator.validate(this.state);
        // setting validation within state
        this.setState({ validation });
        // Letting the validator know in the future if we have submitted this form before
        this.submitted = true;

        // Only POST using axios if the form is all valid
        if (validation.isValid) {
            /** Using Axios to POST this to our /register API and passing the user object as a payload */
            //axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
            axios.post('/api/register', { user })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    window.location.href = "/login";
                });
        }
    };

    // Constructor for login object
    constructor(props) {
        super(props);

        // Validator created from FormValidator class
        this.validator = new FormValidator([
            /* These are all rules. These rules have a:
             * Field: The name of the field in the form that the rule applies to
             * Method: Listed here https://www.npmjs.com/package/validator ,
             *         these are the checks that happen to the field
             * ValidWhen: What the result of the method above needs to be for the rule to be valid\
             * Message: Message to be displayed to the user upon invalid field
             */
            {
                field: 'username',
                method: 'isEmpty',
                validWhen: false,
                message: 'Username is required.'
            },
            {
                field: 'studentid',
                method: 'isEmpty',
                validWhen: false,
                message: 'Student ID is required.'
            },
            {
                field: 'studentid',
                method: 'isInt',
                args: [{allow_leading_zeroes: false}],
                validWhen: true,
                message: 'Student ID must contain no letters or leading zeros'
            },
            {
                field: 'studentid',
                method: 'isLength',
                args: [{min:8, max: 8}],
                validWhen: true,
                message: 'Student ID must be 8 numbers in length'
            },
            {
                field: 'firstname',
                method: 'isEmpty',
                validWhen: false,
                message: 'First name is required.'
            },
            {
                field: 'lastname',
                method: 'isEmpty',
                validWhen: false,
                message: 'Last name is required.'
            },
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Email is required.'
            },
            {
                field: 'email',
                method: 'matches',
                args: [new RegExp("([A-z]{5}[0-9]{3})")],
                validWhen: true,
                message: 'Must be a valid student email username.'
            },
            {
                field: 'password',
                method: 'isEmpty',
                validWhen: false,
                message: 'Password is required.'
            },
        ]);

        // if form has been submitted before
        this.submitted = false;

        // sets state upon construction
        this.state = {
            username: '',
            studentid: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            validation: this.validator.valid(),
        };
    };

    /** Sign Up Form using HTML and Bootstrap */
    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        return (
            <div className="container pt-4">
                <form className="form-vertical m-4" onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <h1 className="pt-2"><b>Sign Up</b></h1>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputUsername3" className="col-sm-2 control-label">Username:</label>
                        <div className="col-sm-10">
                            <input type="text"
                                className={validation.username.classText}
                                id="inputUsername3"
                                placeholder="Username"
                                name="username"
                                onChange={this.handleChange}
                            />
                            <small id="" className="form-text text-danger pl-1">
                                {validation.username.message}
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputId3" className="col-sm-2 control-label">Student ID:</label>
                        <div className="col-sm-10">
                            <input type="number"
                                className={validation.studentid.classText}
                                id="inputId3"
                                placeholder="Student ID"
                                name="studentid"
                                onChange={this.handleChange}
                            />
                            <small id="" className="form-text text-muted pl-1">
                                E.g. 12345678
                            </small>
                            <small id="" className="form-text text-danger pl-1">
                                {validation.studentid.message}
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputFirstname3" className="col-sm-2 control-label">First Name:</label>
                        <div className="col-sm-10">
                            <input type="text"
                                className={validation.firstname.classText}
                                id="inputFirstname3"
                                placeholder="First Name"
                                name="firstname"
                                onChange={this.handleChange}
                            />
                            <small id="" className="form-text text-danger pl-1">
                                {validation.firstname.message}
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputLastname3" className="col-sm-2 control-label">Last Name:</label>
                        <div className="col-sm-10">
                            <input type="text"
                                className={validation.lastname.classText}
                                id="inputLastname3"
                                placeholder="Last Name"
                                name="lastname"
                                onChange={this.handleChange}
                            />
                            <small id="" className="form-text text-danger pl-1">
                                {validation.lastname.message}
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email:</label>
                        <div className="col-sm-10 input-group">
                            <input type="text"
                                className={validation.email.classText}
                                id="inputEmail3"
                                placeholder="user123"
                                name="email"
                                onChange={this.handleChange}
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">@student.otago.ac.nz</span>
                            </div>
                        </div>
                        <div className="col-sm-2">
                        </div>
                        <div className="col-sm-10">
                            <small id="" className="form-text text-danger pl-1">
                                {validation.email.message}
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password:</label>
                        <div className="col-sm-10">
                            <input type="password"
                                className={validation.password.classText}
                                id="inputPassword3"
                                placeholder="Password"
                                name="password"
                                onChange={this.handleChange}
                            />
                            <small id="passwordHelpBlock" className="form-text text-muted pl-1">
                                Your password must be 8-25 characters long and contain letters and numbers.
                            </small>
                            <small id="" className="form-text text-danger pl-1">
                                {validation.password.message}
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-2">
                        </div>
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary mt-2">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;