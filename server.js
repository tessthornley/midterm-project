"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const random_url_gen = require('./public/scripts/random_url_gen');
const vO = require('./knex_view_options');
// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const pollRoutes = require("./routes/polls");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

function create_poll() {

}

// (3) app.get to /submitted after submission
app.post("/poll_submitted", function(req, res) {
  let admin_link = random_url_gen();
  let participant_link = random_url_gen();
  // let templateVars = {admin_link: admin_link,
  //                     participant_link: participant_link,
  //                     poll_question: req.body.question,
  //                     creator_email: req.body.email,
  //                     title: req.body.title,
  //                     description: req.body.description};
  // create_poll(templateVars);

  // console.log(templateVars);
  // console.log(random_url_gen());

  //NEED TO INSERT THIS SUBMISSION DATA AND URL INTO DATABASE!!!!!!

  // res.render(SUCCESSFUL SUBMISSION PAGE (w/ links to both admin, participation url))

<<<<<<< HEAD
// //   }
// //   res.render("take_poll");
// //   //check if userURL exists in database
// //   res.render("take_poll");
// // });

app.post("/u/:userURL", function(req, res) {
  res.redirect("thanks")
});

app.get("/a/:adminURL", function(req, res) {
  //check if adminURL exists in database

  let qGR = require('./knex_get_results');
  let adminURL = String(req.params.adminURL);

  qGR.getResults(adminURL).then((queryResult) => {
    queryResult[i].rank
    res.render("poll_results", {queryResult: queryResult});
  });
});

app.post("/votes_submitted", function(req, res) {
  res.render("thanks");
});

app.get("/u/:participant_url", function(req, res) {
  vO.viewOptions(String(req.params.participant_url)).then((result) => {
    res.render("take_poll", {result: result});
  });
  //check if userURL exists in database
});

app.post("/u/:participant_url", function(req, res) {
  res.redirect("thanks")
});

app.get("/a/:url", function(req, res) {
  //check if adminURL exists in database
  res.render("poll_results")
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
