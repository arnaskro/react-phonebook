const express = require('express')
const app = express()

// Routes and handlers
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Start the server
app.listen(8080, () => console.log('~ React-Phonebook server app listening on port 8080!'))