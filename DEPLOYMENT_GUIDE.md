# 🚀 Deployment Guide: ServiceBoard

Follow these steps to take your application from localhost to the public web.

---

## 1. 🍃 Database: MongoDB Atlas (Free Tier)
Render does not provide a built-in database, so you need a cloud-hosted MongoDB.

1.  Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Create a new project and a **Shared Cluster** (Free).
3.  **Security:** 
    - Create a database user (username/password).
    - Add `0.0.0.0/0` to the IP Access List (to allow Render to connect).
4.  **Connect:** 
    - Click "Connect" ➔ "Drivers".
    - Copy your Connection String (it looks like `mongodb+srv://<db_username>:<db_password>@cluster0...`).
    - **Keep this string for Step 2.**

---

## 2. 🖥️ Backend: Render
Render will host your Express API.

1.  Log in to [Render](https://render.com/).
2.  Click **New +** ➔ **Web Service**.
3.  Connect your GitHub repository.
4.  **Configure:**
    - **Name:** `service-board-backend`
    - **Root Directory:** `server`
    - **Build Command:** `npm install`
    - **Start Command:** `npm start`
5.  **Environment Variables:** Add the following:
    - `MONGO_URI`: (Your Atlas Connection String from Step 1)
    - `JWT_SECRET`: (Any random string, e.g., `super_secret_123`)
    - `NODE_ENV`: `production`
6.  **Click "Create Web Service".**
7.  **Note your URL:** Once deployed, Render will give you a URL like `https://service-board-backend.onrender.com`. **Copy this for Step 3.**

---

## 3. 🎨 Frontend: Vercel
Vercel will host your Next.js application.

1.  Log in to [Vercel](https://vercel.com/).
2.  Click **Add New** ➔ **Project**.
3.  Import your GitHub repository.
4.  **Configure:**
    - **Project Name:** `service-board-frontend`
    - **Root Directory:** Click `Edit` and select `client`.
5.  **Environment Variables:**
    - Add `NEXT_PUBLIC_API_URL`: (The Render Backend URL from Step 2 + `/api`, e.g., `https://service-board-backend.onrender.com/api`)
6.  **Click "Deploy".**

---

## 🔗 Final Check
Once both are deployed:
1.  Open your Vercel URL.
2.  Try to **Register** and **Login**.
3.  If everything is correct, your frontend is now talking to your production backend!

> **Tip:** Render's free tier "spins down" after inactivity. If the first load takes 30 seconds, it's just the server waking up!
