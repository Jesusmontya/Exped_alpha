# [nombre]

Medical records web application scaffold.

## Project structure

- `frontend/` → static HTML/CSS/JS files
- `backend/` → Node.js + Express server with Supabase connection

## Prerequisites

- Node.js 20+
- A Supabase project

## Setup

1. Copy environment variables:

   ```bash
   cp .env.example backend/.env
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Start backend server:

   ```bash
   npm start
   ```

4. Open frontend:

   Open `frontend/index.html` in your browser (or serve `frontend/` with any static server).

## Backend endpoint

- `GET /health` → basic service health check.
