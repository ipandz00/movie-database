const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/imdb', {useNewUrlParser: true});
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json()) 
require('./app/routes/movie.routes.js')(app);
 
// Create a Server
var server = app.listen(8081, function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log("App listening at http://%s:%s", host, port)
 
})