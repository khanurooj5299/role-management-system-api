//This module sets the super-admin user

//for setting environment variables
import "../config/set-env.js";
//to connect to the DB
import { connect, disconnect } from "../database/connection.js";
import UserModel from "../src/models/user.model.js";
import bcrypt from "bcrypt";

//Main logic is run only when connection to DB is succesfull
connect
  .then(async () => {
    const result = await UserModel.exists({ role: "super-admin" });
    if (result) {
      console.log("Super Admin already exists!");
      disconnect();
    } else {
      bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, 10, async (err, hash) => {
        if (err) {
          console.log("Could not create hash");
          console.log(err);
        } else {
          try {
            await UserModel.create({
              email: process.env.SUPER_ADMIN_EMAIL,
              password: hash,
              created: new Date(),
              role: "super-admin",
              firstName: process.env.SUPER_ADMIN_FIRSTNAME,
              lastName: process.env.SUPER_ADMIN_LASTNAME
            });
            console.log("User created successfully");
          } catch (err) {
            console.log("Could not create Super-admin");
            console.log(err);
          } finally {
            disconnect();
          }
        }
      });
    }
  })
  .catch((err) => {
    console.log("Could not add super-admin");
    console.log(err);
    disconnect();
  });
