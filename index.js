const express = require('express'),
  port = process.env.PORT || 2000,
  cors = require('cors'),
  bParser = require('body-parser'),
  app = express();
require('dotenv').config();

const { db } = require('./config/db');

const index = require('./api/routes/index');
const user = require('./api/routes/user');

app.use(cors());
app.use(bParser.json());

//test db connection
app.use('/*', function (req, res, next) {
  if (db.connection.readyState !== 1) {
    return res.status(500)
      .json({ success: false, message: 'Unable to connect to database' });
  }
  next();
});

app.use('/', index);
app.use('/user', user);

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
