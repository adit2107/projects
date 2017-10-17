/* jshint esversion:6 */
const express = require('express');
const app = express();

app.get('/', (req,res,next) =>{
  res.send('INDEX');
});

app.get('/about', (req,res,next) =>{
  res.send('ABOUT');
});

module.exports = app;
