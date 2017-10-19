/* jshint esversion:6 */
const express = require('express');
const app = express();
// requiring mongoose
const mongoose = require('mongoose');

//body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// method override module to use put and delete along with post
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// using exp session and connect flash for msgs
const session = require('express-session');
const flash = require('connect-flash');

// Importing the model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// ALL ROUTES BEGIN HERE
// Session module for connect flash
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));
// Using connect flash
app.use(flash());
// Setting global variables
app.use((req,res,next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Route handling below
app.get('/', (req,res,next) =>{
  res.render('index');
});

app.get('/about', (req,res,next) =>{
  res.render('about');
});

app.get('/ideas', (req,res,next) =>{
  Idea.find({}).sort({date:'desc'})
  .then(ideas => {
    res.render('ideas/ideasmain', {
      ideas: ideas
    });
  });
});

app.get('/ideas/add', (req,res,next) =>{
  res.render('ideas/add');
});

// Adding new idea form
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
    const newUser = {
      title: req.body.ideaTitle,
      details: req.body.details
    };
    new Idea(newUser).save().then(idea => {
      req.flash('success_msg','Added a new idea.');
      res.redirect('/ideas');
    });
  }
});

// getting idea updating page
app.get('/ideas/edit/:id', (req,res,next) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    res.render('ideas/edit', {
    idea: idea
    });
  });
});

// updating the idea form
app.put('/ideas/:id', (req,res) =>{
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    idea.title = req.body.ideaTitle;
    idea.details = req.body.details;
    idea.save()
    .then(idea =>{
      req.flash('success_msg', 'Updated idea');
      res.redirect('/ideas');
    });
  });
});

// deleting idea form
app.delete('/ideas/:id', (req,res) =>{
  Idea.remove({_id: req.params.id}).then(() => {
    req.flash('error_msg', 'Deleted idea');
    res.redirect('/ideas');
  });
});






module.exports = app;
