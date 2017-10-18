/* jshint esversion:6 */
const express = require('express');
const app = express();
//body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res,next) =>{
  res.render('index');
});

app.get('/about', (req,res,next) =>{
  res.render('about');
});

app.get('/ideas', (req,res,next) =>{
  res.render('ideas/ideasmain');
});

app.get('/ideas/add', (req,res,next) =>{
  res.render('ideas/add');
});

app.post('/ideas', (req,res,next) =>{
  let errors = [];

  if(!req.body.ideaTitle){
    errors.push({text:"Please add a title"});
  }
  if(!req.body.details){
    errors.push({text:"Please add details"});
  }
  if(errors.length > 0){
    res.render('ideas/add', {
      errors: errors,
      ideaTitle: req.body.ideaTitle,
      details: req.body.details
    });
  }else{
    res.render('ideas/ideasmain');
  }
});


module.exports = app;