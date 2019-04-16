// Helps connect to our database and gives a Connected or Not connected message.

const mysql = require('mysql');

// Database Connection for Production - we will need this format when we deploy our app to Google App Engine
// We will also have to add an DB_INSTANCE_NAME with the Instance name in the Cloud SQL overview tab into our .env file

// let config = {
//     user: process.env.SQL_USER,
//     database: process.env.SQL_DATABASE,
//     password: process.env.SQL_PASSWORD,
// }

// if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
//   config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
// }

// let connection = mysql.createConnection(config);

// Database Connection for Development - we will use this when we are developing on our own machines
//
// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASS
// });
//
//   connection.connect(function(err) {
//     if (err) {
//       console.error('Error connecting: ' + err.stack);
//       return;
//     }
//     console.log('Connected as thread id: ' + connection.threadId);
//   });
//
//   module.exports = connection;