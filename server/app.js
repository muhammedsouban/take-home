import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  notFound,
  errorHandler,
} from "./middlewares/errorHandler.middleware.js";
import ProjectRoutes from "./routes/project.route.js";
import TodoRoutes from "./routes/todo.route.js";
import UserRoutes from "./routes/user.route.js";
import morgan from "morgan";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/projects", ProjectRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/todos", TodoRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };
