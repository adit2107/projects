/* jshint esversion:6 */
const express = require('express');

// router
const router = express.Router();

// requiring mongoose
const mongoose = require('mongoose');

//body parser middleware
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Authentication
const {ensureAuthenticated} = require('../helpers/auth');

// method override module to use put and delete along with post
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// using exp session and connect flash for msgs
const flash = require('connect-flash');

// Importing the model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// ALL ROUTES BEGIN HERE

router.get('/', ensureAuthenticated, (req,res,next) =>{
  Idea.find({}).sort({date:'desc'})
  .then(ideas => {
    res.render('ideas/ideasmain', {
      ideas: ideas
    });
  });
});

router.get('/add', ensureAuthenticated, (req,res,next) =>{
  res.render('ideas/add');
});

// Adding new idea form
router.post('/', ensureAuthenticated, (req,res,next) =>{
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
router.get('/edit/:id', ensureAuthenticated, (req,res,next) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    res.render('ideas/edit', {
    idea: idea
    });
  });
});

// updating the idea form
router.put('/:id', ensureAuthenticated, (req,res) =>{
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
router.delete('/:id', ensureAuthenticated, (req,res) =>{
  Idea.remove({_id: req.params.id}).then(() => {
    req.flash('error_msg', 'Deleted idea');
    res.redirect('/ideas');
  });
});


module.exports = router;
