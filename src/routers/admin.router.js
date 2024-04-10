import express from "express";

import { getUserCount, getUsers, addUser } from "../controllers/admin.controller.js";
import { verifyJwt } from "../middleware/verify-jwt.js";

const router = express.Router();

router.get("/get-users", verifyJwt(["admin", "super-admin"]), getUsers);

router.get("/get-user-count", verifyJwt(["admin", "super-admin"]), getUserCount);

router.post("/add-user", verifyJwt(["admin", "super-admin"]), addUser);

export default router;
