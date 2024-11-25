import express from "express";

import { registerNewUser, authUser } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").post(registerNewUser);
router.route("/login").post(authUser);

export default router;
