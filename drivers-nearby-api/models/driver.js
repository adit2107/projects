/* jshint esversion :6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// creating location Schema
const GeoSchema = new Schema({
  type:{
    type: String,
    default: "Point"
  },
  coordinates:{
    type: [Number],
    index: "2d"
  }
});
// creating schema
const DriverSchema = new Schema({
  name :{
    type: String,
    required: [true, 'Name field is necessary']
  },
  rating:{
    type: String
  },
  availability: {
    type: Boolean,
    default: false
  },
  // adding geolocation schema
  geometry: GeoSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
