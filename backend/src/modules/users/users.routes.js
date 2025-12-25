import express from "express";
import pool from "../../config/database.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { tenantGuard } from "../../middleware/tenant.middleware.js";

const router = express.Router();

// 🔥 Tenant Admin Creates Users Inside Same Tenant
router.post("/", authenticate, tenantGuard, async (req, res) => {
  const { email, password, role } = req.body;

  // only tenant admin can create users
  if (req.user.role !== "tenant_admin") {
    return res.status(403).json({ message: "Only tenant admin can create users" });
  }

  try {
    const hashed = await (await import('bcrypt')).default.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (id, tenant_id, email, password, role) VALUES (gen_random_uuid(), $1, $2, $3, $4) RETURNING *",
      [req.tenantId, email, hashed, role]
    );

    res.status(201).json({ message: "User created", user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "User creation failed" });
  }
});

// 🔥 Get Users of Same Tenant
router.get("/", authenticate, tenantGuard, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, role, created_at FROM users WHERE tenant_id = $1",
      [req.tenantId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;
