const unirest = require("unirest");
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // To use body parser with post requests

// Include all static files so we can use CSS
app.use(express.static(__dirname + '/public'));

// Main page
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Display the information when there is a POST request
app.get("/weather", function (request, response) {

  const city = request.query.city;
  // Get the weather data
  const req = unirest("GET", `https://open-weather13.p.rapidapi.com/city/${city}`); // Replace with a valid endpoint


  // let city = "india";
  // // city = city + ", USA"  // Add country if needed

  // req.query({
  //   "q": city,
  //   "lang": "en",
  //   "units": "imperial"
  // });

  // Update your API keys
  req.headers({
    "X-RapidAPI-Key": "6b58b15c0fmsh19c2c7034b7eba4p12d68cjsn4fb58e7ae313", // Replace with your API key
    "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
    "useQueryString": true
  });

  // unirest.get()
  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    response.send(res.body);
  });
});

let port = process.env.PORT || 8002;
app.listen(port, function () {
  console.log("Server running on port " + port);
});
