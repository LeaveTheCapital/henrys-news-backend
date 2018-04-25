const { User } = require("../models");

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then(users => res.send({ users }))
    .catch(err => next(err));
};
