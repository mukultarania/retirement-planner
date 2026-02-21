# Retirement Planner

A full-stack retirement planning app with transaction management, returns (NPS/index), performance views, and optional AI suggestions (Groq).

## 🔮 Future Scope

In future versions, the platform can be integrated directly with users’ bank accounts
(via secure, consent-based APIs).

Planned capabilities:

• Automatic transaction syncing from bank accounts  
• Detection of retirement-related investments  
• Smart tagging of savings & pension contributions  
• Auto-enrollment into retirement planning journeys (opt-in only)  
• Real-time retirement corpus tracking  

If a user opts into a retirement plan, the system can continuously track relevant
transactions and dynamically adjust projections, recommendations, and performance views.

## Stack

- **Frontend:** React 19, Vite 7, TypeScript, Tailwind CSS 4, React Router, Recharts, Axios
- **Backend:** Node.js, Express 5, Mongoose, Zod

## Live Deployment

- **Frontend:**
https://retirement-planner-one.vercel.app/

- **Backend:**
https://retirement-planner-3kfa.onrender.com

## Prerequisites

- Node.js (v18+)
- (Optional) [Groq API key](https://console.groq.com) for AI suggestions

## Quick setup (script)

From the project root, run:

- **Windows (PowerShell):** `.\setup.ps1`
- **Mac / Linux / Git Bash:** `./setup.sh` or `bash setup.sh`

This installs dependencies for backend and frontend and creates `backend/.env` and `frontend/.env.local` from the example files if they don’t exist. Then start backend and frontend as in the sections below.

## Setup (manual)

### Backend

```bash
cd backend
npm install
```

Copy the example env and adjust as needed:

```bash
cp .env.example .env
```

Edit `backend/.env`:

```
PORT=5477
RETURN_RATE=12
```

Start the server:

```bash
npm run dev
```

API runs at **http://localhost:5477**. Base path: `/blackrock/challenge/v1`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
```

Edit `frontend/.env.local`: set `VITE_API_BASE_URL=http://localhost:5477/blackrock/challenge/v1`. For AI suggestions, set `VITE_GROK_API_URL` and `VITE_GROK_API_KEY`.

```bash
npm run dev
```

Open the URL shown in the terminal (e.g. http://localhost:5173).

## Scripts

| App      | Command         | Description          |
|----------|-----------------|----------------------|
| Backend  | `npm run dev`   | Nodemon dev server   |
| Backend  | `npm start`     | Production start     |
| Backend  | `npm test`      | Jest tests           |
| Frontend | `npm run dev`   | Vite dev server      |
| Frontend | `npm run build` | Production build     |
| Frontend | `npm run preview` | Preview production build |
| Frontend | `npm run lint`  | ESLint               |

## Project structure

```
retirement-planner/
├── setup.ps1         # Initial setup script (Windows PowerShell)
├── setup.sh           # Initial setup script (Mac/Linux/Git Bash)
├── backend/           # Express API (transactions, returns, performance)
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   └── validators/
│   └── index.js
├── frontend/         # React + Vite SPA
│   ├── src/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── components/
│   │   └── pages/
│   └── ...
└── README.md
```

## License

ISC
