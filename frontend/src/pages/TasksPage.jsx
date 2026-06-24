import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getTasks,
  addTask as addTaskApi,
  toggleTask as toggleTaskApi,
  deleteTask as deleteTaskApi,
} from "../services/tasks";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        if (!err?.response) {
          setError("Could not reach the backend.");
        } else {
          setError("Could not load tasks right now.");
        }

        setLoading(false);
      });
  }, [navigate]);

  async function addTask(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const task = await addTaskApi(input);
    setTasks((prev) => [...prev, task]);
    setInput("");
  }

  async function toggleTask(id) {
    const updated = await toggleTaskApi(id);
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function deleteTask(id) {
    await deleteTaskApi(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const done = tasks.filter((t) => t.done).length;

  return (
    <div className="app">
      <header>
        <h1>Interview Prep Tasks</h1>
        <p className="subtitle">
          {done}/{tasks.length} complete
        </p>
        <div className="top-links">
          <Link to="/login">Switch account</Link>
          <button className="link-button" onClick={logout} type="button">
            Log out
          </button>
        </div>
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
            <button className="del" onClick={() => deleteTask(task.id)}>
              ✕
            </button>
          </li>
        ))}
      </ul>

      {!loading && tasks.length === 0 && (
        <p className="hint">No tasks yet — add one above.</p>
      )}
    </div>
  );
}
