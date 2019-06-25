# OneRoom React Application

## About

A room booking system originally created for the University of Otago's Business School.

## Authors
- Akash Mokashi
- Elora Chang
- Alice Averill
- Vivek George
- Bradley Windybank

## Development

The front-end of this project was developed using React, Bootstrap,
React Router, Font Awesome, Material Design Bootstrap and Confirm Alert. 

## Structure

The React application is structured as follows:

- App.js starts a Browser Router and creates a Root component within
- This Root component contains the nav element and renders the element passed to it through `this.props.children`
- These components can be one of the following:
    - **Book:** The component that deals with a booking.
    - **Home:** The component that displays any current bookings.
    - **Register:** The component for dealing with registration of a user.
    - **Login:** The component to display and deal with log in.
    - **Form Validator:** A form validator used to validate input within forms.
    - **Nav:** The component that displays the navigation bar.
    - **No Match Page:** The page displayed when a route that does not exist is accessed.
    - **Room:** The component that deals with displaying the details of a room.
    - **Rooms:** The component that displays a list of rooms available and allows the user to book one.
    
## Licenses

Licenses are included within their own packages or within LICENCE file. A list is available in licenses.csv


