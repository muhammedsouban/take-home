import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";

import {
  addTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.route("/create").post(authenticateUser, addTodo);
router.route("/:id").put(updateTodo).delete(authenticateUser, deleteTodo);

export default router;
