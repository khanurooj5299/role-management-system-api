import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";

export function login(req, res, next) {
  const authModel = req.body;
  if (authModel && authModel.email && authModel.password) {
    UserModel.findOne({ email: authModel.email })
      .exec()
      .then((user) => {
        //email exists
        if (user) {
          //checking for password
          bcrypt.compare(authModel.password, user.password, (err, result) => {
            if (err) {
              console.log(err);
              next({
                status: 500,
              });
            } else {
              //password match was successfull
              if (result) {
                //hashed password should not be revealed
                user = user._doc;
                delete user.password;
                res.json({
                  user: user,
                  token: jwt.sign(
                    {
                      //encoding role is optional. One option is that on each request _id is extracted from the token and then role is checked from DB for this token.
                      //But this has the disadvantage of extra DB request on each client req. So we encode token in payload only
                      //as it it heavily used later for authorization purposes
                      role: user.role,
                      _id: user._id,
                    },
                    process.env.TOKEN_KEY
                  ),
                });
              } else {
                next({
                  status: 401,
                  message: "Invalid email/password",
                });
              }
            }
          });
        } else {
          //synchronously throwing an error returns a promise which immediately rejects
          throw {
            status: 401,
            message: "Invalid email/password",
          };
        }
      })
      .catch(next);
  } else {
    throw {
      status: 400,
      message: "Incorrect Body",
    };
  }
}
