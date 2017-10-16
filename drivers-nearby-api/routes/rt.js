/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const driver = require('../models/driver');

// Getting list of drivers from DB
router.get('/drivers', (req, res, next) => {
  driver.geoNear({
    type: "Point",
    coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
  }, {
    maxDistance: 100000,
    spherical: false
  }).then(function(drivers){
    res.send(drivers);
  });
});
//adding new drivers
router.post('/drivers', (req, res, next) => {
  driver.create(req.body).then(function(driver) {
    res.send(driver);
  }).catch(next);
});

router.put('/drivers/:id', (req, res, next) => {
  driver.findByIdAndUpdate({
    _id: req.params.id
  }, req.body).then(function() {
    driver.findOne({
      _id: req.params.id
    }).then(function(driver) {
      res.send(driver);
    });
  });
});

router.delete('/drivers/:id', (req, res, next) => {
  driver.findByIdAndRemove({
    _id: req.params.id
  }).then(function(driver) {
    res.send(driver);
  });
});

module.exports = router;
