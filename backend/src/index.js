import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// --- In-memory "DB" (simulates what Docker would provide via Postgres/Mongo) ---
let tasks = [
  { id: 1, title: "Read the README", done: false },
  { id: 2, title: "Run docker compose up", done: false },
  { id: 3, title: "Create your branch", done: false },
];
let nextId = 4;

// GET /api/tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST /api/tasks
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title?.trim()) return res.status(400).json({ error: "Title is required" });
  const task = { id: nextId++, title: title.trim(), done: false };
  tasks.push(task);
  res.status(201).json(task);
});

// PATCH /api/tasks/:id  — toggle done
app.patch("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  task.done = !task.done;
  res.json(task);
});

// DELETE /api/tasks/:id
app.delete("/api/tasks/:id", (req, res) => {
  const idx = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Task not found" });
  tasks.splice(idx, 1);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
