const request = require('request-promise');

let ensureAuthenticated = (req, res, next) => {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({ status: 'Please log in' });
  }
  // call users-service to authenticate and get user info
  const options = {
    method: 'GET',
    uri: 'http://users-service:3000/users/user',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
    },
  };
  return request(options)
    .then((response) => {
    // response is user data received from users-service
      req.user = response.user;
      return next();
    })
    .catch((err) => { return next(err); });
};

if (process.env.NODE_ENV === 'test') {
  ensureAuthenticated = (req, res, next) => {
    req.user = 1;
    return next();
  };
}

module.exports = {
  ensureAuthenticated,
};
