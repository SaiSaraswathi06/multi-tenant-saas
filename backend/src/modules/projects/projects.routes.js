import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js"; 
import { tenantGuard } from "../../middleware/tenant.middleware.js";
import db from "../../config/database.js";

const router = express.Router();

// Create a project
router.post("/", authenticate, tenantGuard, async (req, res) => {
  try {
    const { name } = req.body;
    const tenantId = req.tenantId; // from token middleware

    const result = await db.query(
      "INSERT INTO projects (name, tenant_id) VALUES ($1, $2) RETURNING *",
      [name, tenantId]
    );

    res.status(201).json({ message: "Project created", project: result.rows[0] });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get projects
router.get("/", authenticate, tenantGuard, async (req, res) => {
  try {
    const tenantId = req.tenantId;

    const result = await db.query(
      "SELECT * FROM projects WHERE tenant_id=$1",
      [tenantId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
