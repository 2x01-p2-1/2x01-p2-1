const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();
app.set("view engine", "ejs");
app.use(express.json())
app.use(cors());
app.use(express.static('public'));

//Setting up the Environment
const port = process.env.PORT;
const host = process.env.HOST;

//Setting up Challenges routes
var challenges = require('./routes/challenges');
app.use('/challenges', challenges);

//Setting up SensorData routes
var sensorData = require('./routes/sensorData');
app.use('/sensorData', sensorData);

app.get('/', function (req, res) {
    res.send('Welcome to SIT.')
  });

app.listen(port,host, () => {
  // print a message when the server starts listening
  console.log("server starting on " + host + ":" + port);
});