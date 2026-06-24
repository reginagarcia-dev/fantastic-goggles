import { useState, useEffect } from "react";
import "./App.css";

const API = "http://localhost:3001/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((data) => { setTasks(data); setLoading(false); })
      .catch(() => { setError("Could not reach the backend."); setLoading(false); });
  }, []);

  async function addTask(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input }),
    });
    const task = await res.json();
    setTasks((prev) => [...prev, task]);
    setInput("");
  }

  async function toggleTask(id) {
    const res = await fetch(`${API}/${id}`, { method: "PATCH" });
    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function deleteTask(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const done = tasks.filter((t) => t.done).length;

  return (
    <div className="app">
      <header>
        <h1>Interview Prep Tasks</h1>
        <p className="subtitle">{done}/{tasks.length} complete</p>
      </header>

      <form onSubmit={addTask} className="add-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button type="submit">Add</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <p className="hint">Loading tasks...</p>}

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <button className="check" onClick={() => toggleTask(task.id)}>
              {task.done ? "✓" : "○"}
            </button>
            <span className="title">{task.title}</span>
            <button className="del" onClick={() => deleteTask(task.id)}>✕</button>
          </li>
        ))}
      </ul>

      {!loading && tasks.length === 0 && (
        <p className="hint">No tasks yet — add one above.</p>
      )}
    </div>
  );
}
