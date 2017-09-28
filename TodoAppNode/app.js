var express = require('express');

//exporting todoController
var todoController = require('./controllers/todoController');

var app = express();
// Setting view engine EJS
app.set('view engine','ejs');
// Setting up static files
app.use(express.static('./assets'));

todoController(app);

// Listening to port 3000
app.listen(3000);
console.log('Port 3000 listening');
