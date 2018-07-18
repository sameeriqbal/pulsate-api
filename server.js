const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/db');
const port = 9999;
var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' });
app.use(jsonParser);
app.use(urlencodedParser);

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  const devices = require('./routes/GeneralRouter')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})