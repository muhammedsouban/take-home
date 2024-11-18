import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";

import {
  addProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateProject,
  downloadProjectMarkdown,
} from "../controllers/project.controller.js";

const router = express.Router();

router.route("/list/:userId").get(authenticateUser, getAllProjects);
router.route("/create").post(authenticateUser, addProject);
router
  .route("/:id")
  .get(authenticateUser, getProject)
  .put(authenticateUser, updateProject)
  .delete(authenticateUser, deleteProject);
router.route("/downloadMarkdown").post(authenticateUser, downloadProjectMarkdown);

export default router;
