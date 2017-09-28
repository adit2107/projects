var data = [{
  item: 'take dog'
}, {
  item: 'buy veggies'
}, {
  item: 'buy shoes'
}];
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
module.exports = function(app) {

  app.get('/todo', (req, res) => {
    res.render('todo', {test: data});
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    data.push(req.body);
    res.render('todo', {test: data});
  });

  app.delete('/todo/:item', (req, res) => {
    data = data.filter(function(todo) {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  });


};
