//this line should be at top so that for any module the environment variables are available
import "../config/set-env.js";

//to connect to the DB
import { connect } from "../database/connection.js";

//importing function which executes logic to start the application
import startApplication from "./app.js";

//Application will start only when connection to DB is succesfull
connect
  .then(() => {
    startApplication();
  })
  .catch((err) => {
    console.log("Could not start application");
    console.log(err);
  });
