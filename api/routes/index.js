const express = require('express');

const router = express.Router();
const { getIndex, postIndex } = require('../controllers/index');

router.get('/', getIndex);
router.post('/', postIndex);

module.exports = router;
