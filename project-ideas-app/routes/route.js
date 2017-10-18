/* jshint esversion:6 */
const express = require('express');
const app = express();

app.get('/', (req,res,next) =>{
  res.render('index');
});

app.get('/about', (req,res,next) =>{
  res.render('about');
});

module.exports = app;
