const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql');

// Enable cross origin requests
app.use(cors())

// Database
const connection = mysql.createConnection({
  host     : "reactpb.c3xcnkqal7bl.eu-central-1.rds.amazonaws.com",
  user     : "reactpb",
  password : "reactpb2018",
  port     : "3306",
  database : "reactpb"
});

// Start the database connection
connection.connect(function(err) {
  if (err) {
    console.error('~ Database connection failed: ' + err.stack);
    return;
  }

  console.log('~ Connected to database.');
});


// Routes and handlers
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// [GET] contacts
app.get('/contacts', (req, res) => {
  console.log("[GET] contacts")
  connection.query('SELECT * FROM Contacts', function (error, results, fields) {
    res.send(results);

    // Handle error after the release.
    if (error) throw error;
  });
});

// Start the server
app.listen(8080, () => console.log('~ React-Phonebook server app listening on port 8080!'))

// connection.end(); // End connection