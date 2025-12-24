import express from "express";
import pool from "../../config/database.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { tenantGuard } from "../../middleware/tenant.middleware.js";

const router = express.Router();

// Get all projects for the logged-in tenant
router.get("/", authenticate, tenantGuard, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM projects WHERE tenant_id = $1",
      [req.tenantId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

export default router;
