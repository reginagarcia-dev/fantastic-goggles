import express from "express";
import cors from "cors";
import authenticateToken from "./utils/authentication.js";
import "dotenv/config";
import authRouter from "./routes/auth.js";
import tasksRouter from "./routes/tasks.js";
const app = express();
const PORT = 3001;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing. Set it in backend/.env");
}

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/tasks", authenticateToken, tasksRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`),
);
