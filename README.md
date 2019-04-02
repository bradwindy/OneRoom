# Otago Business School Room Booking System
A meeting-room booking system built with ReactJS, Express.js, Node.js and Cloud SQL.

## Table of Contents

* [Setup](#setup)
    * [Installing Git](#installing-git)
    * [Installing Node and npm](#installing-node-and-npm)
    * [Project Setup](#Project Setup)
    * [Database Setup](#Database Setup)
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
ls app
```

Return back to the `roomease` folder.

```
cd ../
```
Change to the `backend` folder and install development and production dependencies.

```
cd backend
npm install
```

Check that you now have the `node_modules` folder within your `backend` folder.
This would have set up Express.js and a way to connect to the database for you.

```
ls backend
```

### Database Setup

STEPS FOR MAC OSX USERS:

To keep the database connection secure, it is generlly not advised to share the
connection information online, but this will be the only way we can get Sherlock to
connect to our CloudSQL Database.

While you are still in the `backend` folder, type into the terminal

```
touch .env
```
Copy paste this into `.env`

```
DB_HOST=35.201.14.21
DB_DATABASE=roomease_schema
DB_USER=admin
DB_PASS=admin
```
.env helps establish a connection to the CloudSQL Database, when you run the Node server.

-- ALL STEPS AFTER THIS POINT IS SOLELY FOR THE DEVELOPMENT TEAM, NOT FOR SHERLOCK --

Now you need to choose a database managing tool like DBeaver or MySQL Workbench. This will
help you add/delete/view and manage the database.

[Download DBeaver](https://dbeaver.io/download/)

[Download MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

For setup instructions let's just talk about it.

Note: The tables should be setup (except for foreign keys)

## Understanding our Files

FOR MAC USERS ONLY:

1. Open Finder
2. On the top bar of the Screen (File, Edit, View, Go, Window, Help) - click on 'Go'
3. Then, select 'Home' from the dropdown.
4. Locate and open 'roomease'

You should be able to see the folders `app` and `backend`. Ignore the `README.md'

### The app directory
This directory refers to the front end of the system. This is where Elora and Bradley will work on the UI/UX things.

### The backend directory
This directory refers to the back end of the system. This is where Alice, Vivek and Akash will work on 
setting up the middleware, server and database.

Open the `server.js` file. Read through it, I've put in some comments to give a basic overview of what's going on.

Also, open the `database.js` file. This file simply checks whether we have succesfully conected to the database everytime we
launch a local server using Node. It takes values for host, user, database and password from the `.env' file, which we set up
earlier.

### Common files in Directories

`package.json` - this file hold the dependencies we will use when developing our frontend or backend. 
This is why we have two seperate "package.json" files for `app` and `backend`

`node_modules` - this directory consists of several different Javascript packages/libraries that
help us develop things faster. Things like Express, React, MySQL when developing come from here.

`.gitignore` - this file basically tells Git what not to put onto GitBucket. For example, things like
'node_modules' should not and do not need to be put onto GitBucket as they are large. Basically, things
which are very large and are more locally oriented files should be added to the `.gitignore` document.
