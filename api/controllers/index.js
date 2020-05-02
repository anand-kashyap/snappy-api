
const getIndex = (req, res, next) => {
};

const postIndex = (req, res, next) => {

  res.status(201).json({ success: 'works post' });
};

module.exports = { getIndex, postIndex };