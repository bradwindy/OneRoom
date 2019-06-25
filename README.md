# OneRoom Booking System
A meeting-room booking system built with ReactJS, Express.js, Node.js and MongoDB.
We have chosen to follow a MVC pattern of development.

[View the app live!](https://one-room-bookings.herokuapp.com/login)

## Authors
- Bradley Windybank
- Vivek George
- Alice Averill
- Elora Chang
- Akash Mokashi

## Table of Contents
* [Setup](#setup)
    * [Installing Git](#installing-git)
    * [Installing Node and npm](#installing-node-and-npm)
    * [Project Setup](#Project-Setup)
    * [Database Setup](#Database-Setup)
    * [Launching the Development Environment](#Launching-the-Development-Environment)
    * [Closing the Development Environment](#Closing-the-Development-Environment)
* [Directory and File Breakdown](#Directory-and-File-Breakdown)
    * [The app directory](#The-app-directory)
    * [The backend directory](#Backend)
    * [Common files in Directories](#Common-files-in-Directories)

## Setup
These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Installing Git
You can install Git for Mac, Windows and Linux by following the instructions here for your operating system.
[Install Git](https://www.atlassian.com/git/tutorials/install-git)

### Installing Node and npm
npm is simply a package manager for Javascript libraries. We will use npm to install Express.js, React.js and several other useful packages.

To install Node and npm for Mac or Windows:

[Install for Mac](https://nodejs.org/dist/v10.15.3/node-v10.15.3.pkg)

[Install for Windows](https://nodejs.org/dist/v10.15.3/node-v10.15.3-x86.msi)

### Project Setup

STEPS FOR WINDOWS USERS:
Once you have Git setup, open Command Prompt and navigate to
```
cd /Users/YOURNAME
```

Now, clone the repo
```
git clone https://github.com/bradwindy/OneRoom.git
```

Check that the Room_Booking_System directory is cloned and installed into your computer. Then open the directory.

```
dir
cd Room_Booking_System
```

Change to the `app` folder and install development and production dependencies.

```
cd app
npm install
```

Check that you now have the `node_modules` folder within your `app` folder.
This would've setup React.js for you.

```
dir
```

Return back to the `Room_Booking_System` folder and install development and production dependencies for the backend/server side.

```
cd ../
npm install
```

Check that you now have the `node_modules` folder within your `Room_Booking_System` folder.
This would have set up Express.js and a way to connect to the database for you.

```
dir
```



STEPS FOR MAC OSX USERS:

Once you have Git setup, open Terminal from your applications and navigate to
```
cd /Users/YOURNAME
```

Now, clone the repo
```
git clone https://github.com/bradwindy/OneRoom.git
```

Check that the Room_Booking_System directory is cloned and installed into your computer. Then open the directory.

```
ls
cd Room_Booking_System
```

Change to the `app` folder and install development and production dependencies.

```
cd app
npm install
```

Check that you now have the `node_modules` folder within your `app` folder.
This would've setup React.js for you.

```
ls
```

Return back to the `Room_Booking_System` folder and install development and production dependencies for the backend/server side.

```
cd ../
npm install
```

Check that you now have the `node_modules` folder within your `Room_Booking_System` folder.
This would have set up Express.js and a way to connect to the database for you.

```
ls
```

### Database Setup

STEPS FOR WINDOWS USERS:

Download MongoDB (MSI) for your OS by following the instructions in this link: [Download MongoDB](https://www.mongodb.com/download-center/community)

1. Once MongoDB has been downloaded locate the downloaded MSI file, usually found within your computer's `Downloads` folder.

2. Open the MSI file and install MongoDB by following the installation wizard. Choose the 'Complete' installation option. Also choose the "Install MongoDB Compass" option, usually located on the 5th screen. Click "Install". 
This should open up MongoDB Compass Community on your computer.

3. On the MongoDB Compass Community application click "Connect". This should setup a MongoDB instance locally on your machine. Do not close this window! This window must be left open for development purposes. 


STEPS FOR MAC USERS:

Download MongoDB (ZIP/TGZ) for your OS by following the instructions in this link: [Download MongoDB](https://www.mongodb.com/download-center/community)

1. Once MongoDB has been downloaded locate the downloaded ZIP or TGZ file, usually found within your computer's `Downloads` folder.

2. Open the ZIP or TGZ file and navigate to the `bin` directory and double click the `mongod.pdb` or `mongod` file. This should open a Command Prompt or Terminal window and setup a MongoDB instance locally on your machine. Do not close this window! This window must be left open for development purposes. 

If you would like to exit/stop running the MongoDB instance just press CTRL + C on Windows, or COMMAND + C on Mac.

### Launching the Development Environment

STEPS FOR WINDOWS/MAC USERS:
With Node and npm installed and a MongoDB instance running we can now launch our frontend and backend.

1. Open a new Command Prompt or Terminal window.
2. Navigate to the `Room_Booking_System` directory which is most likely located in your `User` directory if you have followed these steps.

```
cd /Users/YOURNAME/Room_Booking_System
```
3. Once within the directory, type `npm run dev`. This command will start the server/backend on PORT 5000 and will then start the app/frontend on PORT 3000.

4. The app/frontend should automatically open in a web browser. You can also manually access the app/frontend by pasting `http://localhost:3000/login` in the URL section of your preffered web browser.

### Closing the Development Environment

1. Press CTRL + C on Windows(Command Prompt) or COMMAND + C on Mac(Terminal) to shut down Node. This is done within the window where you earlier typed `npm run dev`

2. Once Node is stopped, exit/stop running the MongoDB instance by pressing CTRL + C on Windows(Command Prompt), or COMMAND + C on Mac(Terminal).

## Directory and File Breakdown

### API Routes
POST: /register - creates new user

POST: /auth/signin - logs in user based on input

PUT: /booking/newBooking/:id - updates a particular booking (by replacing)

GET: /booking/showBooking - displays bookings

DELETE: /booking/deletebooking/:roomId/:bookingId - deletes particular booking

GET: /rooms/all - displays all rooms

GET: /rooms/:name - gets a particular room given its name

GET: /user/:username - gets a particular user given their username



### The app directory
This directory refers to the front end of the system.
**_Refer to app folder README for more details._**

[App README](https://github.com/bradwindy/OneRoom/tree/master/app)

### Backend

The root of this project consists of five main directories `routes`, `helpers`, `controllers`, `models` and `tests`. It also consists of two main files `server.js` and `passport.js`.

`routes` - this directory solely consists of our Express.js routes. This is the entry point of any data from the frontend. The routes usually include several functions taken from the `helpers` and `controllers` directories.

`helpers` - this directory focuses on files which have code and functionality which can be shared by different parts of the project. For example, the routeHelpers.js file consists of Joi (an input validation package), so when data is sent from the front end to the /register route, it is first input validated by Joi (within the routeHelpers.js file) and only then will the validated data be passed to the controller. So a helper can be thought as a checker/checkpoint between our route and controller.

`controllers` - this directory focuses on defining the logic of the routes stored in `routes`. For example, we have a route /register, the AuthController will store all the user details which is passed via the /register route, into the database, only after the data has been validated by a `helper` . So a controller can be thought of as an interface between the database and our routes.

`models` - this directory focuses on defining the MongoDB schemas for a User, Room and Booking. The model is usually the last step in the API request, which involves either storing/accessing/updating data and returning a success or failure status. 

`tests` - this directory focuses on defining unit and integration tests for the backend. This involves test to check if a database connection is succesful, storing, reading and modifying data in the database is working individually through their respective funtions or together as a controller and API.

`server.js` is our main backend/server file. This file will provide access to all the routes in the `routes` directory and can be considered as the brain of the backend. It will also list all the middleware such as bodyParser (which will convert the incoming data into JSON). It also helps establish a connection to our MongoDB database.

`passport.js` is the main file which handles authentication and security. It provides functions which allow the backend to authorise a user by generating a JWT token when the user logs in. This token is then validated each time the user tries to access any restricted functionality through the mechanism of 'protected routes' which involves sending the earlier generated JWT token which each request.

### Common files in Directories

`package.json` - this file hold the dependencies we will use when developing our frontend or backend.
This is why we have two seperate "package.json" files for `app` and `backend`. It also consists of information about launching the app and server.

`node_modules` - this directory consists of several different Javascript packages/libraries that
help us develop things faster. Things like Express, React, MySQL when developing come from here.

