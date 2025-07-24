# 🧿 Oryn — Personal CMS Landing Page

Oryn is a full-stack **MERN** (MongoDB, Express.js, React, Node.js) project designed as a one-user content-managed landing page. Styled with **Tailwind CSS** and **daisyUI**, it enables a user-friendly, aesthetic experience — ideal for showcasing personal content with full control.

> ⚠️ Hosted on [Render](https://render.com/), so **cold starts may cause slow initial loading** on the free tier.

---

## 🌐 Live Demo  
[🔗 https://oryn.onrender.com](https://oryn-l629.onrender.com/)

---

## 🛠 Tech Stack

**Frontend**  
- React  
- Tailwind CSS  
- daisyUI  
- Axios  
- React Router

**Backend**  
- Node.js  
- Express  
- MongoDB (via Mongoose)  
- JWT Authentication  
- Redis (Upstash)  
- bcrypt

---

## ✨ Features

- 🔐 One-admin authentication system (email & password)
- 📄 Create, update, and delete landing content
- 🌙 Responsive and accessible UI using daisyUI
- ⚡ Clean dashboard and layout
- ☁️ Hosted via Render (backend and frontend)

---

## 🚀 Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/clrnlvly/oryn.git
cd oryn

### 2. Install Dependencies
Frontend:

cd backend
npm install

Backend:

cd frontend
npm install

### 3. Create .env File
In the /backend folder, create a .env file:

MONGO_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0
PORT=5001

UPSTASH_REDIS_REST_URL=https://your-upstash-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_admin_password

JWT_SECRET=your_secret_key
NODE_ENV=development

### 4. Run the App
Backend:
  cd backend
  npm run dev

Frontend:
  cd frontend
  npm run dev

App should now be running on:
  Frontend: http://localhost:5173
  Backend: http://localhost:5001

🔐 Admin Access
This site is intended for single-user personal use. Only one admin account is supported via the credentials in .env.

📦 Folder Structure
oryn/
├── backend/      # React frontend with Tailwind & daisyUI
    └── .env
├── frontend/      # Express backend with MongoDB, Redis
├── README.md

🧑‍💻 Author
Lovely Clareon

