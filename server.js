var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Table Reservations (DATA)
// =============================================================
var reservations = [];


var tables_r = []; //Contains up to 5 entries
var waitlist_r = []; //Contains all other entries exceeding 5




// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});


// Get JSON
app.get("/api/tables", function(req, res) {
    res.json(tables_r);
});

app.get("/api/waitlist", function(req, res) {
    res.json(waitlist_r);
});

app.get("/api/reservations", function(req, res) {
    res.json(reservations);
});


// Post new reservations -- takes in JSON input
  app.post("/api/reservations/", function(req, res) {

      var newreservation = req.body;
      newreservation.routeName = newreservation.reserve_name.replace(/\s+/g, "").toLowerCase();

      console.log(newreservation);
      reservations.push(newreservation); //Each new entry is pushed to original array of all reservations

      if (reservations.length <= 5) {
        tables_r.push(newreservation); //First 5 entries are pushed to this array
        res.json(newreservation);
      } else {
        waitlist_r.push(newreservation); //All OTHER entries are pushed to this array
        res.json(newreservation);
      }
  });

  app.post("/api/clear", function() {
    tables_r = [];
    waitlist_r = [];
    reservations = [];
    



});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
