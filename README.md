# Job-APP

This project now includes:

- **Spring Boot REST API**
- **Spring Data JPA** with H2 in-memory database
- **React frontend** (Vite) for job CRUD operations
- **Spring Data REST** + **Spring Security** for protected API access

## Backend (Spring Boot)

Path: `/home/runner/work/Job-APP/Job-APP/JobApp`

Run:

```bash
cd /home/runner/work/Job-APP/Job-APP/JobApp
./mvnw spring-boot:run
```

API base URL: `http://localhost:8080/api/jobs`

## Frontend (React)

Path: `/home/runner/work/Job-APP/Job-APP/frontend`

Run:

```bash
cd /home/runner/work/Job-APP/Job-APP/frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

The Vite dev server proxies `/api` requests to the Spring backend.

## Completed TODOs

- [x] Use **Spring Data REST** for Job APIs
- [x] Use **Spring Security** with HTTP Basic authentication
- [x] Expose repository as `/api/jobs`
- [x] Add Data REST config to expose entity IDs
- [x] Add security filter chain for `/api/**`
- [x] Configure default auth user (`jobadmin`)
- [x] Remove legacy manual controller/service layer
- [x] Resolve repository/data-rest import + config signature issues
- [x] Build and test verification passed (`./mvnw -q test`)

## API

- Base path: `/api`
- Jobs endpoint: `/api/jobs`
- Auth: Basic (`jobadmin` / `jobadmin123`)

## Status

Project is currently in a working state with Spring Data REST + Spring Security integrated.
