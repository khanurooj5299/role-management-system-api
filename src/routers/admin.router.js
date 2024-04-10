import express from "express";

import { getUsers } from "../controllers/admin.controller.js";
import { verifyJwt } from "../middleware/verify-jwt.js";

const router = express.Router();

router.get("/get-users", verifyJwt(["admin", "super-admin"]), getUsers);

export default router;
