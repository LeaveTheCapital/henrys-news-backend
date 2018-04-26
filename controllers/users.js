const { User } = require("../models");

exports.getUserByUsername = (req, res, next) => {
  const userName = req.params.username;
  User.findOne({ username: userName })
    .then(user => res.send({ user }))
    .catch(err => next(err));
};
