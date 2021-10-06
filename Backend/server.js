const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

//Setting up the Environment
const port = process.env.PORT;
const host = process.env.HOST;

//Setting up Student routes
var student = require('./routes/student');
app.use('/student', student);

//Setting up Admin routes
var admin = require('./routes/admin');
app.use('/admin', admin);

//Setting up MSP432 routes
var msp432 = require('./routes/msp432');
app.use('/msp432', msp432);

app.get('/', function (req, res) {
    res.send('Welcome to SIT.')
  });

app.listen(port,host, () => {
  // print a message when the server starts listening
  console.log("server starting on " + host + ":" + port);
});