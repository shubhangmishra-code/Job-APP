# Job-APP

This project now includes:

- **Spring Boot REST API**
- **Spring Data JPA** with H2 in-memory database
- **React frontend** (Vite) for job CRUD operations

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
