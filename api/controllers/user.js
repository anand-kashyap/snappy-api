const { User } = require('../models/user');

const userList = (req, res, next) => {
  res.status(200).json({ success: 'works userlist' });
};

const registerUser = (req, res) => {

  const { body: userObj } = req;
  // console.log(userObj);
  const newUser = new User(userObj);
  return newUser.save().then(
    () => res.status(201).json({ success: 'user registered!' })
  ).catch(e => {
    console.log(e.errmsg);
    res.status(400).json({ message: 'Error creating User' })
  });

}

module.exports = { userList, registerUser };