
const getIndex = (req, res, next) => {
  res.status(200).json({ success: 'working api' });
};

const postIndex = (req, res, next) => {

  res.status(201).json({ success: 'works post' });
};

module.exports = { getIndex, postIndex };