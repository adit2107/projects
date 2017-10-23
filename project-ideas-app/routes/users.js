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

// Importing the model
require('../models/User');
const User = mongoose.model('users');

// User registration and login
router.post('/register', (req,res,next) =>{
  var errors = [];

  if(req.body.password != req.body.password2){
    errors.push({text: 'Passwords do not match.'});
  }else if((req.body.password.length && req.body.password2.length) < 4){
    errors.push({text:'Password length must be larger than 4 characters.'});
  }

  if(errors.length > 0){
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  }else{
    res.send('passed');
  }
});

router.get('/register', (req,res,next) =>{
  res.render('users/register');
});

router.get('/login', (req,res,next) =>{
  res.render('users/login');
});



module.exports = router;
