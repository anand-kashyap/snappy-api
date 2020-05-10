const express = require('express'),
  { validate } = require('../utils/helper'),
  { body } = require('express-validator'),
  router = express.Router();

const { userList, registerUser, login } = require('../controllers/user');

router.get('/', userList);
router.post('/login', [
  validate([
    body('email').isEmail().trim(),
    body('password').exists().isLength({ min: 5 })
  ])
], login);
router.post('/register', [
  validate([
    body('email').isEmail().trim(),
    body('name').exists({ checkFalsy: true }).withMessage('Name is required').trim(),
    body('password').exists().isLength({ min: 5 })
  ])
], registerUser);

module.exports = router;
