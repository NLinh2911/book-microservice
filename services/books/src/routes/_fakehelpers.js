const ensureAuthenticated = (req, res, next) => {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'Please log in',
    });
  }
  if (req.headers.authorization.split(' ')[1] === 'correctToken') {
    req.user_id = 0;
    return next();
  }
  res.status(400).json({
    status: 'Incorrect Token',
  });
};

module.exports = {
  ensureAuthenticated,
};
