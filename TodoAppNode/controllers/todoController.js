/*jshint esversion: 6 */ 
// var data = [{
//   item: 'take dog'
// }, {
//   item: 'buy veggies'
// }, {
//   item: 'buy shoes'
// }];
// Parsing POST data
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
var mongoose = require('mongoose');

// Connecting to the database
mongoose.connect('mongodb://testme:test@ds151554.mlab.com:51554/todotest')

// Creating schema
var todoSchema = new mongoose.Schema({
  item: String
});
// Creating model based on schema
var Todo = mongoose.model('todo', todoSchema);
//Adding item to collection
// var item1 = Todo({item: 'Buy dog food'}).save(function(err){
//   if (err) throw err;
//   console.log("Item Saved.");
// });

module.exports = function(app) {

  app.get('/todo', (req, res) => {
    Todo.find({}, function(err, data) { // Getting data from DB and render the view
      if (err) throw err;
      res.render('todo', {
        test: data
      });

    });
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    var newTodo = Todo(req.body).save(function(err) { // Adding data to DB from form using req.body
      if (err) throw err;
      res.render('todo', {
        test: newTodo
      });
    });
});

  app.delete('/todo/:item', (req, res) => {
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });
};
