const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');


const app = express();
const port = 3000;


const db = new pg.Client({
  user: "postgres",     
  host: "localhost",
  database: "blogging_site", 
  password: process.env.PASSWORD,  
  port: 5432,
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));

// Example Route
app.get('/', (req, res) => {
  db.query('SELECT * FROM your_table_name', (err, result) => {
    if (err) {
      console.error('Error executing query', err.stack);
      res.send('Error');
    } else {
      res.send(result.rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
