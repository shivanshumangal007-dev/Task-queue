# Task Queue

A Redis-backed task queue system with:

- Express API for creating and querying tasks
- Worker process for background task processing
- React + Vite dashboard for live task visibility

## Tech Stack

- Backend: Node.js, Express, Redis
- Worker: Node.js, Redis blocking pop loop
- Frontend: React, Vite, Axios, Tailwind CSS

## Repository Structure

- `server.js`: API server entry point
- `api/routes.js`: task endpoints
- `api/redisclient.js`: Redis queue helpers
- `worker/worker.js`: background task processor
- `frontend_for_task_queue/`: UI project

## Prerequisites

- Node.js 18+
- npm 9+
- Redis server running locally or remotely

## Setup

1. Install backend dependencies:
   - `npm install`
2. Install frontend dependencies:
   - `npm --prefix ./frontend_for_task_queue install`
3. Create environment files:
   - Copy `.env.example` to `.env`
   - (Optional) Copy `frontend_for_task_queue/.env.example` to `frontend_for_task_queue/.env`

## Environment Variables

### Backend (`.env`)

- `PORT`: API server port (default example: `3000`)

### Frontend (`frontend_for_task_queue/.env`)

- `VITE_BACKEND_URL`: API base URL used by Axios (example: `http://localhost:3000`)

## Run Locally

Start API server (development mode):

- `npm run dev`

Start worker:

- `npm run worker`

Start frontend:

- `npm run frontend:dev`

## Production Commands

- Backend server: `npm start`
- Worker: `npm run worker:start`
- Frontend build: `npm run frontend:build`

## API Endpoints

- `POST /tasks`: enqueue a new task
- `GET /task/:id`: fetch a task by id (searches queued + completed lists)
- `GET /NumberOfTasks`: queue/completed/total counts
- `GET /getTasks`: list queued tasks

## Example Request

`POST /tasks`

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

## Notes

- Keep `.env` out of source control.
- Commit lockfiles for deterministic installs.
- Consider adding tests and CI workflows as the next step.
