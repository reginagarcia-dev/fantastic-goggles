import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email already exists
    const emailCheck = await pool.query(
      "SELECT 1 FROM users WHERE email = $1",
      [email],
    );
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword };

    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
      [user.email, user.password],
    );
    const token = jwt.sign(
      { userId: result.rows[0].id, email: result.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({ email: user.email, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userResult = await pool.query(
      "SELECT id, email, password, created_at FROM users WHERE email = $1",
      [email],
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const user = userResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.json({
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
