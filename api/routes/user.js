const express = require('express');

const router = express.Router();
const { userList, registerUser } = require('../controllers/user');

router.get('/', userList);
router.post('/register', registerUser);

module.exports = router;
