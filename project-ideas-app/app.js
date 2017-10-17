/* jshint esversion: 6 */
const port = process.env.PORT || 8080;

const routes = require('./routes/route.js');

routes.listen(port, function(){
  console.log(`Listening to port: ${port}`);
});
