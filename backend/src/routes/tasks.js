import express from "express";
import pool from "../db.js";
const router = express.Router();

// GET /api/tasks
router.get("/", async (req, res) => {
  const userId = req.user?.userId;

  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at ASC",
      [userId],
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/tasks
router.post("/", async (req, res) => {
  const userId = req.user?.userId;
  const { title } = req.body;
  if (!title?.trim())
    return res.status(400).json({ error: "Title is required" });
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *",
      [title.trim(), userId],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/tasks/:id - toggle done
router.patch("/:id", async (req, res) => {
  const userId = req.user?.userId;

  try {
    const result = await pool.query(
      "UPDATE tasks SET done = NOT done WHERE id = $1 AND user_id = $2 RETURNING *",
      [req.params.id, userId],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Task not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  const userId = req.user?.userId;

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [req.params.id, userId],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Task not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
