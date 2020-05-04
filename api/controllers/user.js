const { User } = require('../models/user'),
  { hash, compare } = require('bcrypt');

const userList = (req, res, next) => {
  res.status(200).json({ success: 'works userlist' });
};

const registerUser = async (req, res, next) => {
  const { body: userObj } = req;
  // console.log(userObj);
  userObj.password = await hash(userObj.password, 10); // encrypting pass
  console.log(userObj.password);
  const newUser = new User(userObj);
  return newUser.save().then(
    () => res.status(201).json({ msg: 'user registered!' })
  ).catch(next);

}

module.exports = { userList, registerUser };