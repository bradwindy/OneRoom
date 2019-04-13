# RoomEase React Application

## About

A room booking system for the University of Otago's Business School.

## Authors
- Akash Mokashi
- Elora Chang
- Alice Averill
- Vivek George
- Bradley Windybank

## Development

The front-end of this project was developed using React.js, Bootstrap css, and React Router for React.

## Structure

The React application is structured as follows:

- App.js starts a Browser Router and creates a Root component within
- This Root component contains the nav element and renders the element passed to it through `this.props.children`
- These components can be one of the following
    - **Book:** The component that deals with a booking
    - **Home:** The component that displays any current bookings
    - **Register:** The component for dealing with registration of a user
    - **Login:** The component to display and deal with log in.

## Running

In the app directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.