const mongoose = require('mongoose');
const { DB_USER, DB_PASS, DB_NAME } = process.env;
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-yu8za.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).catch(console.error);

mongoose.connection.on('connecting', function () {
  console.log('db connecting');
});

mongoose.connection.on('error', function (err) {
  console.log('error in mongo connection: ' + err.message);
  mongoose.disconnect();
});

mongoose.connection.on('disconnected', function () {
  console.log('db disconnected');
});

mongoose.connection.on('connected', function () {
  console.log('db connected');
});

gracefulShutdown = function (msg, callback) {
  mongoose.connection.close();
  console.log('Mongo disconnected through ' + msg);
  callback();
};

// For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});

// For Heroku app termination
process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app termination', function () {
    process.exit(0);
  });
});


module.exports = { db: mongoose };