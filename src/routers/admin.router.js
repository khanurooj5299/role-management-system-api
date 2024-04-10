import express from "express";

import { getUserCount, getUsers } from "../controllers/admin.controller.js";
import { verifyJwt } from "../middleware/verify-jwt.js";

const router = express.Router();

router.get("/get-users", verifyJwt(["admin", "super-admin"]), getUsers);

router.get("/get-user-count", verifyJwt(["admin", "super-admin"]), getUserCount);

export default router;
