/* jshint esversion:6 */
const express = require('express');
// router
const router = express.Router();

// requiring mongoose
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

//body parser middleware
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());

const {ensureAuthenticated} = require('../helpers/auth');

// Passport module
const passport = require('passport');

// Importing the model
require('../models/User');
const User = mongoose.model('users');

// User login
router.post('/login', (req,res,next) => {
  passport.authenticate('local', {
    successRedirect: '/ideas',
    failureRedirect: '/user/login',
    failureFlash: true
  })(req,res,next);
});

// User registration
router.post('/register', (req, res, next) => {
  var errors = [];

  if (req.body.password != req.body.password2) {
    errors.push({
      text: 'Passwords do not match.'
    });
  } else if ((req.body.password.length && req.body.password2.length) < 4) {
    errors.push({
      text: 'Password length must be larger than 4 characters.'
    });
  }

  if (errors.length > 0) {
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        req.flash('error_msg', 'User already registered.');
        res.redirect('/user/register');
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save()
              .then(user => {
                req.flash('success_msg', 'Successfully registered.');
                res.redirect('/user/login');
              }).catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
});

router.get('/register', (req, res, next) => {
  res.render('users/register');
});

router.get('/login', (req, res, next) => {
  res.render('users/login');
});

router.get('/logout', (req,res,next) => {
  req.logout();
  req.flash('success_msg','Successfully logged out.');
  res.redirect('/user/login');
});



module.exports = router;
