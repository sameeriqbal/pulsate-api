const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./config/db');
const port = 9999;

app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api/devices', devices);
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    
    const devices = require('./routes/devices')(app, database);

    app.listen(port, () => {
      console.log('We are live on ' + port);
    });               
  })