import jwt from "jsonwebtoken";

//this function is a factory for the actual middleware. config is based on roles array. can be used with or without roles.
export function verifyJwt(roles) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_KEY, (err, payload) => {
        if (err) {
          next({
            status: 401,
            message: "Invalid Token",
          });
        } else {
          //the token is valid
          //next check if role restriction also applies for this route
          if (roles) {
            //check if role in token payload matches the required role for this route
            if (roles.includes(payload.role)) {
              next();
            }
            //the user does not have the permissions for this route
            else {
              next({
                status: 403,
                message: "Access denied",
              });
            }
          } else {
            //else if only being logged in is enough pass the request through
            next();
          }
        }
      });
    }
    //no token found
    else {
      throw {
        status: 401,
      };
    }
  };
}
