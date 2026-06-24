# Interview Prep — Full-Stack Mock Repo

A minimal React + Node task app that mirrors what you'll likely encounter in the interview.

## Stack
- **Frontend** — React 18 + Vite (port 5173)
- **Backend**  — Node 22 + Express (port 3001)
- **DB**       — Postgres 16 via Docker (port 5432)

## Quick Start

```bash
# 1. Start the database
docker compose up -d

# 2. Start the backend  (new terminal)
cd backend && npm install && npm run dev

# 3. Start the frontend (new terminal)
cd frontend && npm install && npm run dev
```

Then open http://localhost:5173

## Git Workflow (interview day)
```bash
git clone <repo-url>
cd <repo>
git checkout -b yourname/feature-name
# ... make changes ...
git add .
git commit -m "feat: describe what you did"
git push -u origin yourname/feature-name
```

## API Endpoints

| Method | Path            | Description       |
|--------|-----------------|-------------------|
| GET    | /api/tasks      | List all tasks    |
| POST   | /api/tasks      | Create a task     |
| PATCH  | /api/tasks/:id  | Toggle done/undone|
| DELETE | /api/tasks/:id  | Delete a task     |
