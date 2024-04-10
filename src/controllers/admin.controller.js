import UserModel from "../models/user.model.js";

export function getUsers(req, res, next) {
  //if no query params are provided, by default the first 100 users are returned
  const pageIndex = req.query.pageIndex || 0;
  const pageSize = req.query.pageSize || 100;

  //exclude the password field for all users
  UserModel.find({}, { password: 0, __v: 0 })
    .skip(pageIndex * pageSize)
    .limit(pageSize)
    .exec()
    .then((users) => res.json(users))
    .catch(next);
}

export function getUserCount(req, res, next) {
  UserModel.countDocuments({})
    .exec()
    .then((count) => res.json({ count }))
    .catch(next);
}
