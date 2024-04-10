import express, { json } from "express";
import cors from "cors";

import authRouter from "./routers/auth.router.js";

export default function startApplication() {
  const app = express();
  const PORT = process.env.PORT;

  //register middleware
  app.use(json());
  app.use(cors());

  //register paths
  app.use("/auth", authRouter);
  //Wildcard path for catching everything that didn't match
  app.use("*", (req, res) => {
    throw new Error(404);
  });

  //Register centralized error handling middleware
  app.use((err, req, res, next) => {
    //if next(err) is called after we have started writing response, we fallback to default express error handler
    if (res.headersSent) {
      return next(err);
    }
    if (err.message == 404) {
      res.status(404).send("Nothing here");
    } else if (err.status == 400) {
      res.status(400).send(err.message || "Bad request");
    } else if (err.status == 401) {
      res.status(401).send(err.message || "Invalid Credentials");
    } else if (err.status == 403) {
      res.status(403).send(err.message || "Forbidden");
    } else {
      console.dir(err.message || err);
      res.status(500).send("Something went wrong!");
    }
  });

  //Start server
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}
