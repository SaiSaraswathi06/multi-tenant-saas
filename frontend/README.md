# 🚀 Multi-Tenant SaaS - Project & Task Manager  
A complete SaaS-based application with **Authentication, Multi-Tenant Access Control, Projects, Tasks, and Role-based Features**.  
Built using **Node.js + Express + PostgreSQL + JWT Auth + React (Vite)**.

---

## ✨ Features

### 🔐 Authentication
- Login with JWT based authentication
- Super Admin & Tenant Admin access support

### 🏢 Multi-Tenant Architecture
- Each tenant's data is isolated
- Users can access only their own projects & tasks

### 📁 Project Module
- Create and view projects
- Each project is linked to a tenant

### ✅ Task Module
- Add tasks under specific projects
- Update status (Pending/Completed)
- Delete tasks
- Protected using token + tenant-check middleware

### 💻 Tech Stack

| Category | Technologies |
|--------|-------------|
| Backend | Node.js, Express.js, PostgreSQL, JWT |
| Frontend | React + Vite, Axios, React Router DOM |
| Database | PostgreSQL |
| Deployment Ready | Render, Vercel/Netlify, Railway |

---

## 📂 Folder Structure

multi-tenant-saas/
│── backend/
│ ├── src/
│ │ ├── routes/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── config/
│ │ └── server.js
│ ├── package.json
│ └── .env
│
└── saas-frontend/
├── src/
│ ├── pages/
│ ├── components/
│ ├── services/api.js
│ └── App.jsx
├── vite.config.js
└── package.json

yaml
Copy code

---

## 🔧 Environment Variables

### Backend `.env`
PORT=5000
DATABASE_URL=postgres://user:password@host:5432/saas_db
JWT_SECRET=your_secret_key_here

shell
Copy code

### Frontend `.env`
VITE_API_URL=http://localhost:5000/api

yaml
Copy code

---

## 🛠 Setup Instructions

### 1️⃣ Clone Repo
```bash
git clone https://github.com/your-username/multi-tenant-saas.git
cd multi-tenant-saas
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
npm run dev        # or node server.js
Run Postgres migrations & seeds manually if needed.

3️⃣ Frontend Setup
bash
Copy code
cd ../saas-frontend
npm install
npm run dev
Open 👉 http://localhost:5173

🧪 Testing APIs (Postman)
Method	Endpoint	Description
POST	/api/auth/login	Login & get token
GET	/api/projects	Get projects
POST	/api/projects	Create project
GET	/api/tasks/project/:id	Get tasks by project
POST	/api/tasks	Add task

Use Authorization: Bearer <token> for protected routes.

🌍 Deployment Guide
Backend – Deploy on Render
Create GitHub repo → push code

Open https://render.com

Click New Web Service

Select backend folder repo

Set Build & Start Commands:

yaml
Copy code
Build Command: npm install
Start Command: node server.js
Add environment variables under Render → Environment

Deploy (Render will give public backend URL)

Database (PostgreSQL on Render/Railway/Supabase)
Recommended → Railway or NeonDB (free)

Create database

Copy DB connection string → paste in backend .env

Run migrations manually in SQL console

Restart backend service

Frontend Deployment (Netlify/Vercel)
On Vercel
Go to https://vercel.com

Import GitHub repo → choose saas-frontend folder

Add environment variable:

ini
Copy code
VITE_API_URL=YOUR_RENDER_BACKEND_URL/api
Deploy 🎉

On Netlify
arduino
Copy code
npm run build
netlify deploy --prod


⭐ Improve further (future roadmap)
Multi-user invite inside tenants

Subscription plans & payments

Admin dashboard analytics

UI Enhancement with Tailwind/MUI

💙 Author
Sai Saraswathi Ganja

Feel free to fork, contribute, or raise issues.