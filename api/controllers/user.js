const { User } = require('../models/user');

const userList = (req, res, next) => {
  res.status(200).json({ success: 'works userlist' });
};

const registerUser = (req, res) => {

  const { body: userObj } = req;
  console.log(userObj);

  // const newUser = new User(userObj);
  res.status(201).json({ success: 'user registered!' });
}

module.exports = { userList, registerUser };