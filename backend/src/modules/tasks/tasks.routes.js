import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { tenantGuard } from "../../middleware/tenant.middleware.js";
import db from "../../config/database.js";

const router = express.Router();

// Create Task
router.post("/", authenticate, tenantGuard, async (req, res) => {
  try {
    const { project_id, title } = req.body;
    const tenantId = req.tenantId;

    if (!project_id || !title) {
      return res.status(400).json({ message: "project_id and title required" });
    }

    const result = await db.query(
      "INSERT INTO tasks (project_id, title, tenant_id, status) VALUES ($1, $2, $3, 'pending') RETURNING *",
      [project_id, title, tenantId]
    );

    res.status(201).json({ message: "Task created", task: result.rows[0] });
  } catch (error) {
    console.log("Task Create Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get tasks of tenant
router.get("/", authenticate, tenantGuard, async (req, res) => {
  try {
    const tenantId = req.tenantId;

    const result = await db.query(
      "SELECT * FROM tasks WHERE tenant_id = $1",
      [tenantId]
    );

    res.json(result.rows);
  } catch (error) {
    console.log("Task List Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update Task
router.put("/:id", authenticate, tenantGuard, async (req, res) => {
  try {
    const { title, status } = req.body;
    const { id } = req.params;
    const tenantId = req.tenantId;

    const result = await db.query(
      "UPDATE tasks SET title = COALESCE($1, title), status = COALESCE($2, status) WHERE id = $3 AND tenant_id = $4 RETURNING *",
      [title, status, id, tenantId]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task updated", task: result.rows[0] });
  } catch (error) {
    console.log("Task Update Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete
router.delete("/:id", authenticate, tenantGuard, async (req, res) => {
  try {
    const tenantId = req.tenantId;

    const result = await db.query(
      "DELETE FROM tasks WHERE id = $1 AND tenant_id = $2 RETURNING id",
      [req.params.id, tenantId]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.log("Task Delete Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// Get tasks by Project ID
router.get("/project/:project_id", authenticate, tenantGuard, async (req, res) => {
  try {
    const { project_id } = req.params;
    const tenantId = req.tenantId;

    const result = await db.query(
      "SELECT * FROM tasks WHERE project_id = $1 AND tenant_id = $2",
      [project_id, tenantId]
    );

    return res.json(result.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching tasks by project" });
  }
});


export default router;
