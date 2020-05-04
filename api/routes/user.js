const express = require('express'),
  { validate } = require('../utils/helper'),
  { body } = require('express-validator'),
  router = express.Router();

const { userList, registerUser } = require('../controllers/user');

router.get('/', userList);
router.post('/register', [
  validate([
    body('email').isEmail().trim(),
    body('name').exists({ checkFalsy: true }).withMessage('Name is required').trim(),
    body('password').exists().isLength({ min: 5 })
  ])
], registerUser);

module.exports = router;
