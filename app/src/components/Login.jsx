import React, { Component } from 'react';
import axios from 'axios';
import FormValidator from './FormValidator';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {Redirect} from "react-router-dom";

// DOM purify to be used in this file
class Login extends Component {
    // Constructor for login object
    constructor(props) {
        super(props);
        //this.handleClearForm = this.handleClearForm.bind(this);

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

        // if form has been submitted before
        this.submitted = false;

        // sets state upon construction
        this.state = {
            email: '',
            password: '',
            validation: this.validator.valid(),
            checkbox: false,
            redirect: false
        };

        setAuthorizationToken(localStorage.jwtToken);
    };

    /** Takes the value of anything that is typed by the user for the form fields
    * and sets the state for the form field above.
    * Source - https://reactjs.org/docs/forms.html
    */
    handleChange = event => {
        
        this.setState({
            [event.target.name]: event.target.value
        });
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
    
        this.setState({ [input.name]: value });
    };


    // handleClearForm(event) {  
    //     event.preventDefault();
    //     this.setState({
    //         email:'',
    //         password:'',
              
    //     });
    //   };


    /** HandleSubmit is triggered when the sign up form is submitted */
    handleSubmit = async (event) => {
        // Stopping the browser from reloading the page
        event.preventDefault();

        // Making a new object called userLogin which takes all the inputted form details
        const userLogin = {
            email: this.state.email + "@student.otago.ac.nz",
            password: this.state.password,
        };

        const { email, password, checkbox } = this.state;
        
        localStorage.setItem('email', checkbox ? email : '');
        localStorage.setItem('password', checkbox ? password : '');
        localStorage.setItem('checkbox', checkbox);
        
        

        // Calling a validator to validate state on submit
        const validation = this.validator.validate(this.state);
        // setting validation within state
        this.setState({ validation });
        // Letting the validator know in the future if we have submitted this form before
        this.submitted = true;

        // Only POST using axios if the form is all valid
        if (validation.isValid) {
            /** Using Axios to POST this to our /API/Login and passing the userLogin object as a payload */
            await axios.post('/auth/signin', userLogin)
                .then(res => {
                    // take json web token (JWT) that was returned from server
                    // we'll save it in local storage
                    const token = res.data.token; //capture jwt
                    localStorage.setItem('jwtToken', token);// set jwt in localStorage
                    setAuthorizationToken(token);

                    this.setState({ redirect: true });
                });
        }
        
        //this.handleClearForm(event);
        
    };

    componentDidMount() {
        const checkbox = localStorage.getItem('checkbox') === 'true';
        const email = checkbox ? localStorage.getItem('email') : '';
        const password = checkbox ? localStorage.getItem('password') : '';
        this.setState({ email, password, checkbox });
        this.setState({ redirect: false });
      };

 
    render() {
        // Setting validation conditionally
        let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
        // noinspection HtmlUnknownTarget

        if(this.state.redirect){
            return <Redirect to={"/"} />;
        }else{
            return (
                // log in page, below, validation.x.y are values from within validation object
                <div className="container p-4">

                    <form className="form-vertical m-4" onSubmit={this.handleSubmit}>
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <h1 className="pt-4"><b>Lets get together.</b></h1>
                                <p>RoomEase lets you book a meeting room to suit you and your 
                                    groups needs exactly.
                                </p>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10 input-group shadow-lg p-3 mb-1 rounded ">
                                <input type="text"
                                       className={validation.email.classText}
                                       id="inputEmail3"
                                       placeholder="user123"
                                       name="email"
                                       value={this.state.email}
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
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10 shadow-lg p-3 mb-2 rounded">
                                <input type="password"
                                       className={validation.password.classText}
                                       id="inputPassword3"
                                       placeholder="Password"
                                       name="password"
                                       value={this.state.password}
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
                                        <input type="checkbox"
                                               name="checkbox"
                                               value={this.state.checkbox}
                                               onChange={this.handleChange}
                                        /> Remember me
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-2">
                            </div>
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit} >Log in</button>
                                <a className="btn btn-primary m-2" href="/register" role="button">Create account</a>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default Login;