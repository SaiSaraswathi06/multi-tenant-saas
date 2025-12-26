📌 Multi-Tenant SaaS Backend (Node.js + Express + PostgreSQL + JWT + Docker)

A fully functional Multi-Tenant SaaS application backend with authentication, user management, project management, and task management.
Supports multi-tenant architecture, secure JWT authentication, and role-based access with Docker support.

🚀 Features
Module	Features
Authentication	Login with JWT, bcrypt password hashing
Users	Create users, list users by tenant
Projects	Create, Get All, Update, Delete
Tasks	Create, Update, Delete, Get by Tenant, Get by Project
Security	JWT-based auth, Tenant isolation middleware
Database	PostgreSQL + pg pool connection
Dockerized	One-command run using docker-compose
🏗 Tech Stack

Node.js + Express.js

PostgreSQL

JWT Authentication

Bcrypt Password Hashing

Docker + Docker Compose

Postman for testing

📂 Folder Structure
multi-tenant-saas/
│── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes.js
│   │   ├── config/
│   │   │   ├── env.js
│   │   │   └── database.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── tenant.middleware.js
│   │   └── modules/
│   │       ├── auth/
│   │       │   └── auth.routes.js
│   │       ├── users/users.routes.js
│   │       ├── projects/projects.routes.js
│   │       └── tasks/tasks.routes.js
│   ├── Dockerfile
│── docker-compose.yml
│── README.md

🐳 Run Using Docker
docker compose up --build


Backend runs at:

http://localhost:5000


Check service:

GET http://localhost:5000/health

🔐 Login Credentials (Seeded)
Role	Email	Password
Super Admin	admin@saas.com
	Admin@123
Tenant Admin	tenant@saas.com
	Admin@123
🔥 API Endpoints
1. Auth
Method	Endpoint	Description
POST	/api/auth/login	Login & returns JWT
Login Body
{
  "email": "admin@saas.com",
  "password": "Admin@123"
}

2. Users
Method	Endpoint
POST	/api/users
GET	/api/users

Create User Body:

{
  "name": "John Doe",
  "email": "john@company.com",
  "password": "User@123"
}

3. Projects
Method	Endpoint
POST	/api/projects
GET	/api/projects
PUT	/api/projects/:id
DELETE	/api/projects/:id
{
  "name": "Project One"
}

4. Tasks
Method	Endpoint
POST	/api/tasks
GET	/api/tasks
PUT	/api/tasks/:id
DELETE	/api/tasks/:id
GET	/api/tasks/project/:projectId

Task Body

{
  "project_id": "PROJECT_UUID",
  "title": "First Task"
}

Postman Collection Export

Open Postman

Go to Collections → three dots → Export → v2.1

Save file as multi-tenant-saas.postman_collection.json

Add file to repo root

git add multi-tenant-saas.postman_collection.json
git commit -m "added postman export"
git push

📌 Future Enhancements

Refresh tokens

Multi-tenant subscription plans

Frontend dashboard

👤 Author

Sai Saraswathi

