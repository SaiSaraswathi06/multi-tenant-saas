import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import projectRoutes from "./modules/projects/projects.routes.js";
import userRoutes from "./modules/users/users.routes.js";
import taskRoutes from "./modules/tasks/tasks.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

export default router;
