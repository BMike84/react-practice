// used to get data from .env file
require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// Sample GET route
app.get("/show", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.rows);
    }
  });
});

//pst
app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage)  VALUES ($1, $2, $3, $4, $5)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
