const express = require('express')
const cors = require('cors')
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

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

app.put('/contacts', (req, res) => {
  console.log('[PUT] contact');

  if (typeof req.body.isFavorite !== "undefined")
    connection.query(`UPDATE Contacts SET isFavorite = '${req.body.isFavorite}' WHERE ID =' ${req.body.id}'`, (error, results, fields) => {
        res.send(results);

        if (error) throw error;
    });
  else if (typeof req.body.name !== "undefined" && typeof req.body.tel_no !== "undefined")
    connection.query(`UPDATE Contacts SET Name = '${req.body.name}', TelNo = '${req.body.tel_no}' WHERE ID =' ${req.body.id}'`, (error, results, fields) => {
        res.send(results);

        if (error) throw error;
    });

  else console.log("Whoops, something went wrong, check the request", req);


});

// [POST] contact

app.post('/contact', (req, res) => {
  console.log("[POST] contact ")
  connection.query(`INSERT INTO Contacts (Name, TelNo) VALUES( '${req.body.name}', '${req.body.tel_no}')`, function (error, results, fields) {
    res.send(results);
    console.log("Inserted contact with ID = ", results.insertId);

    if (error) throw error;
  });
});

// [DELETE] contact
app.delete('/contact', (req, res) => {
  console.log("[DELETE] contact")
  connection.query(`DELETE FROM Contacts WHERE Id = '${req.body.id}'`, function (error, results, fields) {
    res.send(results);

    if (error) throw error;
  });
});

// Start the server
app.listen(8080, () => console.log('~ React-Phonebook server app listening on port 8080!'))

// connection.end(); // End connection
