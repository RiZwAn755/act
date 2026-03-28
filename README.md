# Full-Stack Authentication App

A full-stack authentication project built with:

- **Frontend:** React + Vite + React Router
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Auth:** JWT stored in HTTP-only cookies

The app provides signup, login, protected route access (`/dashboard`), and logout.

## Project Structure

```
task/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleswares/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```

## Prerequisites

- Node.js (v18 or newer recommended)
- npm (or pnpm for frontend if you prefer)
- MongoDB connection string (local or cloud)

## Environment Variables

### Backend (`backend/.env`)

Create a `.env` file inside `backend`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=3000
```

Notes:

- `MONGO_URI` is required.
- `JWT_SECRET` is required.
- `PORT` is optional (defaults to `3000`).

### Frontend (`frontend/.env`)

Create a `.env` file inside `frontend`:

```env
VITE_API_URL=http://localhost:3000
```

This is used by login/signup/private route checks and logout calls.

## Installation

From the project root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run the App

You need **two terminals**.

### 1) Start Backend

```bash
cd backend
node index.js
```

Backend runs on `http://localhost:3000` by default.

### 2) Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

## Available Scripts

### Backend

- `npm test` (placeholder script)

### Frontend

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Endpoints

Base URL: `http://localhost:3000`

- `POST /auth/register`
  - Body: `{ username, email, password }`
- `POST /auth/login`
  - Body: `{ email, password }`
- `GET /auth/me`
  - Protected route, checks auth cookie
- `POST /auth/logout`
  - Clears auth cookie

## Authentication Flow

1. User signs up or logs in.
2. Backend returns a JWT in an HTTP-only `token` cookie.
3. Frontend requests `/auth/me` to verify session for protected routes.
4. On logout, cookie is cleared and user is redirected to login.

## Important Notes

- Backend CORS currently allows `http://localhost:5173` with credentials.
- Frontend requests include cookies via `credentials: 'include'`.
- Protected route logic is implemented in `frontend/src/pages/privatecomponent.jsx`.

## Deployment Tips

- Set environment variables on your hosting providers for both frontend and backend.
- Ensure frontend `VITE_API_URL` points to your deployed backend URL.
- For production cookies across domains, you may need stricter cookie and CORS settings (`sameSite`, `secure`, allowed origins).
