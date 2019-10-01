
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const usuario = require('./route/usuario');

const app = express();
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'projetox'
});

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou!');
});

global.db = connection;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/autenticao/',usuario);

module.exports = app;