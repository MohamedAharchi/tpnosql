var express = require('express');
var cons = require('consolidate');
var path = require('path');
var Provider = require('./provider-mongodb').Provider;
var bodyParser = require('body-parser');
var app = express();

app.engine('html', cons.jade);
app.set('title', 'tp-nosql');
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

function errorHandler(err, req, res, next) {
  console.error(err.message);
  console.error(err.stack);
  res.status(500);
  res.render('error_template', {error: err});
}
app.use(errorHandler);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));
  

// On définit notre fichier de routes.  
var collaborateurs = require('./roads/collaborateurs');
var core = require('./roads/core');
//on utilise notre provider
var provider = new Provider('localhost', 8080);

// on le définit pour l'utiliser dans l'ensemble du projet 
app.use(function(req,res, next) {
  req.provider = provider;
  next();
});

app.use('/', core);
app.use('/collaborateurs', collaborateurs);

module.exports = app;
