# Task Queue

Redis-backed task queue with:

- Express API for creating and querying tasks
- Worker process for background processing
- React + Vite dashboard for real-time visibility

## Tech Stack

- Backend: Node.js, Express, Redis
- Worker: Node.js, Redis blocking pop loop
- Frontend: React, Vite, Axios, Tailwind CSS

## Project Structure

- `server.js`: API server entry point
- `api/routes.js`: HTTP routes for task creation and lookup
- `api/redisclient.js`: Redis queue and read helpers
- `worker/worker.js`: task consumer and simulator
- `frontend_for_task_queue/`: dashboard app

## Prerequisites

- Node.js 18+
- npm 9+
- Redis server (local or remote)

## Quick Start

1. Install backend dependencies.

```bash
npm install
```

2. Install frontend dependencies.

```bash
npm --prefix ./frontend_for_task_queue install
```

3. Create env files.

```bash
copy .env.example .env
copy frontend_for_task_queue\.env.example frontend_for_task_queue\.env
```

4. Run API server.

```bash
npm run dev
```

5. Run worker in another terminal.

```bash
npm run worker
```

6. Run frontend in another terminal.

```bash
npm run frontend:dev
```

## Environment Variables

Backend `.env`:

- `PORT`: API port (default `3000`)
- `PROCESSING_DELAY_MS`: worker processing delay per task in milliseconds (default `16000`)
- `FAILURE_RATE`: simulated failure probability from `0` to `1` (default `0.3`)

Frontend `frontend_for_task_queue/.env`:

- `VITE_BACKEND_URL`: backend API URL (default `http://localhost:3000`)

## Worker Highlight: Simulated Processing With Delay

The core simulation is in `worker/worker.js` inside `processTask`.

Flow:

1. Worker blocks on Redis queue with `BRPOP task_queue`.
2. On task receive, status moves to `processing`.
3. Worker writes `current_processing_task` in Redis for visibility.
4. Worker waits using `setTimeout` with `PROCESSING_DELAY_MS`.
5. Worker randomly fails with probability `FAILURE_RATE`.
6. Success path pushes task to `completed_tasks`.
7. Failure path pushes task to `failed_tasks`.

This gives you a simple, controllable way to demonstrate async background work without any external job system.

## API Endpoints

- `POST /tasks`: enqueue a task
- `GET /task/:id`: get one task by id
- `GET /NumberOfTasks`: queued/completed/failed totals
- `GET /getTasks`: list queued tasks

### Create Task Example

```http
POST /tasks
Content-Type: application/json
```

```json
{
	"task_type": "send_email",
	"payload": {
		"to": "user@example.com",
		"subject": "Welcome",
		"body": "Hello from Task Queue"
	}
}
```

## Troubleshooting

If you see an error like `Unexpected non-whitespace character after JSON...`, your request body is invalid JSON (extra comma, stray character, or two JSON objects pasted together). The API now returns a clear `400` response for this case.

## Production Commands

- API: `npm start`
- Worker: `npm run worker:start`
- Frontend build: `npm run frontend:build`

## GitHub Readiness Checklist

- `.gitignore` excludes `node_modules`, logs, and `.env`
- Root and frontend README files are present
- `.env.example` files exist
- Scripts are available for backend, worker, and frontend
