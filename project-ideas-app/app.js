/* jshint esversion: 6 */
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
// routes exported
const routes = require('./routes/route.js');

// Global promise
mongoose.Promise = global.Promise;

// connecting to mongoose
mongoose.connect('mongodb://localhost/ideajot-dev', {
  useMongoClient: true
}).then(() => console.log("MongoDB is up and runnin!")).catch((err) => console.log(err));

// Importing the model
require('./models/Idea');
const Idea = mongoose.model('ideas');

//Handlebars middleware
routes.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
routes.set('view engine','handlebars');


// Listening to port
routes.listen(port, function(){
  console.log(`Listening to port: ${port}`);
});
