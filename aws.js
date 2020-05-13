const express = require('express'),
  port = 2000,
  // cors = require('cors'),
  bParser = require('body-parser'),
  app = express();
require('dotenv').config();

const { db } = require('./config/db');

const index = require('./api/routes/index'),
  user = require('./api/routes/user');

// app.use(cors());
app.use(bParser.urlencoded({
  extended: true
}));
app.use(bParser.json());

//test db connection
app.use('/*', function (req, res, next) {
  if (db.connection.readyState !== 1) {
    return res.status(500)
      .json({ msg: 'Unable to connect to database' });
  }
  next();
});

app.use('/', index);
app.use('/user', user);


app.use((err, req, res, next) => { // global error handle
  console.error(err.stack);
  res.status(500).json({ msg: 'Something went wrong!' })
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
