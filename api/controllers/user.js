const { User } = require('../models/user'),
  { sign } = require('jsonwebtoken'),
  { hash, compare } = require('bcrypt');

const userList = (req, res, next) => {
  res.status(200).json({ success: 'works userlist' });
}

const registerUser = async (req, res, next) => {
  const { body: userObj } = req;

  userObj.password = await hash(userObj.password, 10); // encrypting pass
  console.log(userObj.password);

  return User.create(userObj).then(
    () => res.status(201).json({ msg: 'user registered!' })
  ).catch(next);

}

const login = async (req, res, next) => {
  const { email, password: pass } = req.body;

  // return res.status(401).json({ msg: 'test user not found' });
  console.log(req.body);

  const user = await User.findOne({ email }).lean().catch(next);
  if (!user) {
    return res.status(404).json({ msg: 'user not found' });
  }
  const { name, password } = user;
  const match = await compare(pass, password);

  if (!match) {
    return res.status(401).json({ msg: 'Incorrect password' });
  }

  const payload = { name };

  const token = sign(payload, process.env.JWT_SALT, { expiresIn: '2d' })
  res.status(200).json({
    token
  });
}

module.exports = { userList, registerUser, login };