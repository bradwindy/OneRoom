/** The Registeration or Sign up Page for the User
 *  Provides the user with a sign up form. Then, takes the user input
 *  and converts it into JSON using Axios and sends the POST AJAX
 *  request to the /register API Route.
 *  Source - https://youtu.be/oQnojIyTXb8
 */
import React, { Component } from 'react';
import axios from 'axios';

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
            email: this.state.email,
            password: this.state.password,
        };

        /** Using Axios to POST this to our /register API and passing the user object as a payload */
        // axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
        axios.post('/register', { user })
        .then(res => {
                console.log(res);
                console.log(res.data);
            });
    };

    /** Sign Up Form using HTML and Bootstrap */
    render() {
        return (
            <div className="container pt-4">
                <form className="form-vertical m-4" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <h1 className="pt-4"><b>Sign Up</b></h1>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputUsername3" className="col-sm-2 control-label">Username</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputUsername3" placeholder="Username" name="username" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputId3" className="col-sm-2 control-label">Student ID</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="inputId3" placeholder="Student ID" name="studentid" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputFirstname3" className="col-sm-2 control-label">First Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputFirstname3" placeholder="Firstname" name="firstname" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLastname3" className="col-sm-2 control-label">Last Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputLastname3" placeholder="Lastname" name="lastname" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail3" placeholder="Email" name="email" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" name="password" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-5">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;