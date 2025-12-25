import express from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { tenantGuard } from "../../middleware/tenant.middleware.js";
import pool from "../../config/database.js";   // <<< important

const router = express.Router();

// Create User
router.post("/", authenticate, tenantGuard, async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    const tenantId = req.tenantId;

    const hashed = await (await import("bcryptjs")).default.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (tenant_id, name, email, password, role) VALUES ($1,$2,$3,$4,$5) RETURNING id,name,email,role",
      [tenantId, name, email, hashed, role]
    );

    res.status(201).json({ message: "User created", user: newUser.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.detail || err.message });
  }
});


// Get all users
router.get("/", authenticate, tenantGuard, async (req, res) => {
  try {
    const tenantId = req.tenantId;
    const result = await pool.query(
      "SELECT id,name,email,role,created_at FROM users WHERE tenant_id=$1",
      [tenantId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

export default router;
