/* jshint esversion: 6*/
const express = require('express');
const routes = require('./routes/rt');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

app.use(bodyParser.json());
// initializing routes
app.use('/api',routes);
// connecting to DB
mongoose.connect('mongodb://localhost/drivergo');
mongoose.Promise = global.Promise;

// error handling
app.use(function(err,req,res,next){
res.status(422).send(err.message);
});


app.listen(port, function(){
  console.log("ready to accept " + port);
});
