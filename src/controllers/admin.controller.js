import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

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

export function addUser(req, res, next) {
  const user = req.body;
  //for users added by admin default password is used
  bcrypt.hash(process.env.DEFAULT_PASSWORD, 10, async (err, hash) => {
    if (err) {
      console.log("Could not create hash");
      console.log(err);
      next({ status: 500 });
    } else {
      UserModel.exists({ email: user.email })
        .then((result) => {
          if (result) {
            next({
              status: 409,
              message: "Email already exists"
            });
          } else {
            UserModel.create({
              ...user,
              created: new Date(),
              password: hash,
            })
            .then(() => res.json({ message: "User created succsessfully" }))
            .catch(next);
          }
        })
        .catch(next);
    }
  });
}
