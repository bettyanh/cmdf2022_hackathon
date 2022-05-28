'use strict';

// Required packages and dependencies
const express = require("express");
const session = require("express-session");
const fs = require("fs");
const app = express();

// Server initialization
app.use(express.json());


// Pathing to the app's files
// This is a different way of stating the file directory
// app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname + "/app"));
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use(session({
  secret: 'thisisatopsecretnooneshouldknow',
  name: 'lhsession',
  resave: false,
  // Stores session object (req.session) in the session storage which can be local storage or database
  saveUninitialized: true
}));

// Connect to the database
let con;
const port = 8000;
app.listen(port, function() {
  console.log("Light House listening on port " + port + ".");
}).then(function() {
  con.connect(function(err) {
    console.log(err);
    if (err) throw err;
  });
});

// Get the index page (Login page)
app.get("/", function(req, res) {
  if (req.session.loggedIn) {
    res.redirect("/home");
  } else {
    res.redirect("/index")
  }
});

