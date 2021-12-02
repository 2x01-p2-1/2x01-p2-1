const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
var cookieParser = require('cookie-parser')
const net = require('net')
const fs = require('fs')

const tcpServer = net.createServer(function (client) {
  console.log("MSP432 Is Connected")
  client.setEncoding('utf-8')
  client.on('data', function (data) {
    console.log(data)
    if (data == "Hello") {
      try {
        const data = fs.readFileSync('public/MSP432 Files/commands.txt', 'utf8')
        fs.truncateSync( 'MSP432 Files/commands.txt', 0 )
        client.end("FLRFLR")
      } catch (err) {
        console.log(err)
      }
    } else {
      // console.log(JSON.parse(data))

    }
  })
  client.on('end', function () {
    console.log("MSP432 Disconnected")
  })

});
tcpServer.listen(5000,()=>{
  console.log("TCP Server Listening on Port:5000")
})

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs");
app.use(cors());
app.use(express.static('public'));
app.use(
  session({
    secret: "Wl3kQyRhQnpaa24I",
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://Admin:admin@zoomaway.krhvi.mongodb.net/ZoomAway?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//Setting up Challenges routes
var challenges = require('./routes/challenges');
app.use('/challenges', challenges);

//Setting up SensorData routes
var sensorData = require('./routes/sensorData');
app.use('/sensorData', sensorData);

//CSS routes
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.send('Welcome to SIT.')
});

//Views Dashboard routes
app.get('/dashboard', function (req, res) {
  res.render('dashboard');
});


app.listen(3000, () => {
  // print a message when the server starts listening
  console.log("HTTP Server starting on localhost:3000");
});
