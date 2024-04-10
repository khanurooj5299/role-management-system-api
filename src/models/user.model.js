import mongoose from "mongoose";
import rolesArray from "../../config/roles.js";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    immutable: true,
  },
  password: String,
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: rolesArray,
    required: true,
  },
  category: String,
  lastUpdated: Date,
  created: {
    type: Date,
    required: true,
    immutable: true,
  },
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
