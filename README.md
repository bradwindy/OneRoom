# Otago Business School Room Booking System
A meeting-room booking system built with ReactJS, Express.js, Node.js and Cloud SQL.

## Table of Contents

* [Setup](#setup)
    * [Installing Git](#installing-git)
    * [Installing Node and npm](#installing-node-and-npm)
    * [Project Setup](#Project Setup)
    * [Database Setup](#Database Setup)
* [Understanding our Files](#understanding-the-files)

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
