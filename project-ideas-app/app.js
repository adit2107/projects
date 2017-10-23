/* jshint esversion: 6 */
const port = process.env.PORT || 8000;
const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const passport = require('passport');

// Global promise
mongoose.Promise = global.Promise;

// connecting to mongoose
mongoose.connect('mongodb://localhost/ideapad-dev', {
  useMongoClient: true
}).then(() => console.log("MongoDB is up and runnin!")).catch((err) => console.log(err));

// Session module for connect flash
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

// Setting global variables
app.use((req,res,next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Passport
require('./config/passport')(passport);

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
