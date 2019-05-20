# Otago Business School - Room Booking System
A meeting-room booking system built with ReactJS, Express.js, Node.js and MongoDB.
We have chosen to follow a MVC pattern of development.

## Table of Contents

* [Setup](#setup)
    * [Installing Git](#installing-git)
    * [Installing Node and npm](#installing-node-and-npm)
    * [Project Setup](#Project-Setup)
    * [Database Setup](#Database-Setup)
    * [Launching the Development Environment](#Launching-the-Development-Environment)
    * [Closing the Development Environment](#Closing-the-Development-Environment)
* [Understanding our Files](#understanding-the-files)
    * [The app directory](#the-app-directory)
    * [The backend directory](#the-backend-directory)
    * [Common files in Directories](Common-files-in-Directories)

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
git clone https://isgb.otago.ac.nz/info310/git/cowen/Room_Booking_System.git
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
git clone https://isgb.otago.ac.nz/info310/git/cowen/Room_Booking_System.git
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

STEPS FOR WINDOWS/MAC USERS:

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

## Understanding our Files

FOR MAC USERS ONLY:

1. Open Finder
2. On the top bar of the Screen (File, Edit, View, Go, Window, Help) - click on 'Go'
3. Then, select 'Home' from the dropdown.
4. Locate and open 'roomease'

You should be able to see the folders `app` and `backend`. Ignore the `README.md'

### The app directory
This directory refers to the front end of the system. This is where Elora and Bradley will work on the UI/UX things. 
**_Refer to app folder README for more details._**

[App README](https://isgb.otago.ac.nz/info310/cowen/Room_Booking_System/tree/master/app)

### The backend directory
This directory refers to the back end of the system. This is where Alice, Vivek and Akash will work on 
setting up the middleware, server and database.

It consists of three main directories `controllers`, `helpers` and `routes`

`server.js` is our main backend/server file. This file will provide access to all the routes in the `routes` directory and can be considered as the brain of the backend. It will also list all the middleware such as bodyParser (which will convert the incoming data into JSON)

`routes` - this directory solely consists of our Express.js routes. This is the entry point of any data from the frontend. The routes usually include several functions taken from the `helpers` and `controllers` directories.

`helpers` - this directory focuses on files which have code and functionality which can be shared by different parts of the project. For example, the routeHelpers.js file consists of Joi (an input validation package), so when data is sent from the front end to the /register route, it is first input validated by Joi (within the routeHelpers.js file) and only then will the validated data be passed to the controller. So a helper can be thought as a checker/checkpoint between our route and controller.

`controllers` - this directory focuses on defining the logic of the routes stored in `routes`. For example, we have a route /register, the AuthController will store all the user details which is passed via the /register route, into the database, only after the data has been validated by a `helper` . So a controller can be thought of as an interface between the database and our routes.

Also, open the `database.js` file. This file simply checks whether we have succesfully conected to the database everytime we launch a local server using Node. It takes values for host, user, database and password from the `.env' file, which we set up earlier.

### Common files in Directories

`package.json` - this file hold the dependencies we will use when developing our frontend or backend.
This is why we have two seperate "package.json" files for `app` and `backend`. It also consists of information about launching the app and server.

`node_modules` - this directory consists of several different Javascript packages/libraries that
help us develop things faster. Things like Express, React, MySQL when developing come from here.

`.gitignore` - this file basically tells Git what not to put onto GitBucket. For example, things like
'node_modules' should not and do not need to be put onto GitBucket as they are large. Basically, things
which are very large and are more locally oriented files should be added to the `.gitignore` document.
