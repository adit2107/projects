/*jshint esversion: 6 */
var express = require('express');
const por = process.env.PORT || 8080;

//exporting todoController
var todoController = require('./controllers/todoController');

var app = express();
// Setting view engine EJS
app.set('view engine','ejs');
// Setting up static files
app.use(express.static('./assets'));

todoController(app);

// Listening to port 3000
app.listen(por, () =>{
  console.log("listening to port: " + por);
});
