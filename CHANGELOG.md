# Changelog

All notable changes made through pull requests should be documented in this file.

The format is based on Keep a Changelog and this project follows semantic versioning where practical.

## [1.0.1]

### Added

- Frontend auth and routing pages:
  - Login page
  - Register page
  - Protected tasks page
- Frontend service layer for API calls:
  - axios API client
  - auth service
  - tasks service
- Backend route modules:
  - auth routes
  - tasks routes
  - JWT authentication middleware
- Database migration support for users and tasks tables

### Changed

- Protected backend tasks endpoints behind JWT auth at `/api/tasks`.
- Updated backend tasks queries to be user-scoped by `user_id`.
- Updated auth responses to return safe user payloads without password hashes.
- Updated migration flow to:
  - Create `tasks` table if missing
  - Add `user_id` to `tasks` if missing
  - Remove legacy `username` column from `users`
- Updated frontend app to use `react-router-dom` with:
  - `/login`
  - `/register`
  - `/tasks` (protected)
- Updated frontend tasks error handling for unauthorized and network failures.
- Updated frontend API client token behavior to send `Authorization: Bearer <token>` only when token exists.

### Fixed

- Fixed auth route mounting mismatch that caused `/api/auth/register` to return 404.
- Fixed tasks route mounting mismatch caused by duplicate `/api/tasks` prefix.
- Fixed JWT startup/config issue by requiring `JWT_SECRET` at backend startup.

### Security

- Enforced token validation for tasks API access.
- Prevented exposure of password hashes in auth API responses.
- Scoped task CRUD operations to the authenticated user.

## PR Entry Template

Use this section for future pull requests. Copy and append below `## [<package.json version>]`.

### PR: <PR title or number>

- Date: YYYY-MM-DD
- Author: <name>

#### Added

- ...

#### Changed

- ...

#### Fixed

- ...

#### Security

- ...
