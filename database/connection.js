import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

//connectionPromise is a promise which resolves with undefined when the connection is successful and rejects with the mongodb error, when it is not
const connectionPromise = mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connection to DB created succesfully.");
  })
  .catch((err) => {
    console.log("Connection to DB failed!");
    throw err;
  });

export {connectionPromise as connect};
