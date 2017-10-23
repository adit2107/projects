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
require('../models/Idea');
const Idea = mongoose.model('ideas');

// User registration and login
router.get('/register', (req,res,next) =>{
  res.send("register page");
});

router.get('/login', (req,res,next) =>{
  res.send("login page");
});

module.exports = router;
