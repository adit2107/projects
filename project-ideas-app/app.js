/* jshint esversion: 6 */
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const express = require('express');
const app = express();
// app exported

// Global promise
mongoose.Promise = global.Promise;

// connecting to mongoose
mongoose.connect('mongodb://localhost/ideajot-dev', {
  useMongoClient: true
}).then(() => console.log("MongoDB is up and runnin!")).catch((err) => console.log(err));

//Handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine','handlebars');

// Routing idea related routes to route.js
const ideaRoutes = require('./routes/route');
// Routing user related routes from users.js
const userRoutes = require('./routes/users');

// Index and About pages
app.get('/', (req,res,next) =>{
  res.render('index');
});

app.get('/about', (req,res,next) =>{
  res.render('about');
});

// idea routes
app.use('/ideas', ideaRoutes);

// users routes
app.use('/user', userRoutes);


// Listening to port
app.listen(port, function(){
  console.log(`Listening to port: ${port}`);
});
