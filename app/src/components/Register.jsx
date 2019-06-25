/** The Registration or Sign up Page for the User
 *  Provides the user with a sign up form. Then, takes the user input
 *  and converts it into JSON using Axios and sends the POST AJAX
 *  request to the /register API Route.
 *  Source - https://youtu.be/oQnojIyTXb8
 */
import React, {Component} from 'react';
import axios from 'axios';
import FormValidator from "./FormValidator";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Register extends Component {
    // Constructor for register object
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
                field: 'studentId',
                method: 'isEmpty',
                validWhen: false,
                message: 'ID is required.'
            },
            {
                field: 'studentId',
                method: 'isInt',
                args: [{allow_leading_zeroes: false}],
                validWhen: true,
                message: 'ID must contain no letters or leading zeros'
            },
            {
                field: 'studentId',
                method: 'isLength',
                args: [{min: 7, max: 8}],
                validWhen: true,
                message: 'ID must be 7 or 8 numbers in length'
            },
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'First name is required.'
            },
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Email is required.'
            },
            {
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: 'Not a valid email address'
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
            name: '',
            studentId: '',
            username: '',
            email: '',
            password: '',
            validation: this.validator.valid(),
        };
    };

    /**  Takes the value of anything that is typed by the user for the form fields
     *   and sets the state for the form field above.
     *   Source - https://reactjs.org/docs/forms.html
     */
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    /** HandleSubmit is triggered when the sign up form is submitted */
    handleSubmit = async event => {
        // Stopping the browser from reloading the page
        event.preventDefault();

        // Making a new object called user which takes all the inputted form details
        const user = {
            name: this.state.name,
            studentId: this.state.studentId,
            username: this.state.email,
            email: this.state.email,
            password: this.state.password,
        };

        // Calling a validator to validate state on submit
        const validation = this.validator.validate(this.state);
        // setting validation within state
        this.setState({validation});
        // Letting the validator know in the future if we have submitted this form before
        this.submitted = true;

        // Only POST using axios if the form is all valid
        if (validation.isValid) {
            /** Using Axios to POST this to our /register API and passing the user object as a payload */
            //axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
            await axios.post('/auth/register', user)
                .then(res => {
                    window.location.href = "/thanks";
                }).catch(error => {
                    // If there is a 403 error returned, a user must already exist and so inform user
                    if (error.response.status === 403) {
                        alert("User already exists!")
                    }
                });
        }
    };

    /** Sign Up Form using HTML and Bootstrap */
    render() {
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        return (
            <div className="container pt-4">
                <form className="form-vertical m-4" onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <h1 className="pt-2 font-weight-bold">Sign Up</h1>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputName3" className="col-sm-2 control-label font-weight-bold">Full
                            Name:</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   className={validation.name.classText}
                                   id="inputName3"
                                   placeholder="Full Name"
                                   name="name"
                                   onChange={this.handleChange}
                            />
                            <small id="" className="form-text text-danger pl-1">
                                {validation.name.message}
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputId3" className="col-sm-2 control-label font-weight-bold">ID:</label>
                        <div className="col-sm-10">
                            <input type="number"
                                   className={validation.studentId.classText}
                                   id="inputId3"
                                   placeholder="ID"
                                   name="studentId"
                                   onChange={this.handleChange}
                            />
                            <small id="" className="form-text text-muted pl-1">
                                E.g. 1234567
                            </small>
                            <small id="" className="form-text text-danger pl-1">
                                {validation.studentId.message}
                            </small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-sm-2 control-label font-weight-bold">Email:</label>
                        <div className="col-sm-10 input-group">
                            <input type="text"
                                   className={validation.email.classText}
                                   id="inputEmail3"
                                   placeholder="example@email.com"
                                   name="email"
                                   onChange={this.handleChange}
                            />
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
                        <label htmlFor="inputPassword3"
                               className="col-sm-2 control-label font-weight-bold">Password:</label>
                        <div className="col-sm-10">
                            <input type="password"
                                   className={validation.password.classText}
                                   id="inputPassword3"
                                   placeholder="************"
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
                            <a className="btn btn-light mt-2" href="/login"><FontAwesomeIcon icon="chevron-left"/> Back</a>
                            <button type="submit"
                                    className="btn peach-gradient text-white font-weight-bold mt-2">Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;