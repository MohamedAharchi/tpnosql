'use strict';

const express = require('express');

const PORT = 8080;

const app = express();

app.get('/', function(req, res) {
	res.send('Bienvenue sur la page d'accueil\n');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);