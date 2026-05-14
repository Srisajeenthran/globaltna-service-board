# 🛠️ ServiceBoard - Premium Service Marketplace

A state-of-the-art, full-stack marketplace designed for seamless interaction between homeowners and professional service providers. Built with performance, security, and a premium user experience in mind.

[![My Portfolio](https://img.shields.io/badge/Portfolio-Visit%20Me-indigo?style=for-the-badge&logo=react)](https://sris-portfolio-six.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Srisajeenthran-black?style=for-the-badge&logo=github)](https://github.com/Srisajeenthran)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/srisajeenthran-sritharan/)

---

## 🌟 Overview

ServiceBoard is a production-quality application that streamlines the process of finding and managing local service requests. Whether it's a leaky faucet or a complete house renovation, ServiceBoard provides a clean, fast, and secure platform for homeowners to find the right experts.

### 🎯 Key Objectives
- **Simplicity:** A "clean-first" approach to UI, making it accessible for all users.
- **Security:** Industry-standard JWT authentication to protect user data and actions.
- **Reliability:** Fully tested API endpoints and robust client-side validation.

---

## 🔍 Project Deep-Dive

ServiceBoard is built using a modern **Decoupled Architecture**, ensuring scalability and a clear separation of concerns.

### 🧠 The Backend (The Brain)
Built with **Node.js & Express**, the server serves as the secure backbone of the application.
- **Database:** MongoDB (via Mongoose) stores job requests and hashed user credentials.
- **Security:** Implements **Bcrypt.js** for password hashing and **JSON Web Tokens (JWT)** for session persistence.
- **API Design:** A strictly RESTful API with standardized JSON responses and error handling.

### 🎨 The Frontend (The Experience)
Powered by **Next.js 14**, the client provides a lightning-fast, interactive user journey.
- **Design System:** A custom-crafted "Indigo & Slate" theme utilizing **Tailwind CSS**.
- **Auth Integration:** A global `AuthContext` manages user state, automatically attaching JWT tokens to outgoing requests via Axios interceptors.
- **Validation:** Uses **Zod** to ensure data integrity before it even reaches the server.

---

## ✨ Features

### 🏡 For Homeowners
- **Easy Posting:** Intuitive "New Job" form with real-time validation.
- **Status Tracking:** Monitor your requests from "Open" to "Closed" in real-time.
- **Full Control:** Delete or update your requests with a premium, secure interface.

### 🛠️ For Tradespeople
- **Dynamic Browsing:** High-performance search and category filters.
- **Job Details:** Deep-dive into job descriptions and contact info.
- **Quick Actions:** Seamlessly update job statuses to keep everyone informed.

---

## 🧪 Testing & Quality Assurance

Quality is at the heart of ServiceBoard. The project includes a rigorous automated testing suite.

### ✅ Automated Test Results
| Test Category | Description | Status |
| :--- | :--- | :--- |
| **API Connectivity** | Verifies successful communication with MongoDB. | ✅ PASS |
| **Public Access** | Ensures job lists are accessible to all visitors. | ✅ PASS |
| **Auth Security** | Confirms protected routes reject unauthorized access. | ✅ PASS |
| **CRUD Operations** | Validates creating, updating, and deleting jobs with a token. | ✅ PASS |
| **Data Integrity** | Ensures required fields and email formats are validated. | ✅ PASS |

To run the tests yourself:
```bash
cd server
npm test
```

---

## 🛣️ API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and get token
- `GET /api/auth/me` - Get current user profile (Protected)

### Jobs
- `GET /api/jobs` - List all jobs (Supports `search` and `category` filters)
- `GET /api/jobs/:id` - Get specific job details
- `POST /api/jobs` - Create a new job (Protected)
- `PATCH /api/jobs/:id` - Update job status (Protected)
- `DELETE /api/jobs/:id` - Remove a job (Protected)

---

## ⚙️ Quick Start

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 2. Installation
```bash
# Clone the repo
git clone https://github.com/Srisajeenthran/globaltna-service-board.git

# Install Backend dependencies
cd server
npm install

# Install Frontend dependencies
cd ../client
npm install
```

### 3. Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/service-board
JWT_SECRET=your_super_secret_key
```

### 4. Seed Data
```bash
cd server
npm run seed
```

### 5. Launch
```bash
# Terminal 1 (Server)
cd server
npm run dev

# Terminal 2 (Client)
cd client
npm run dev
```

---

## 👨‍💻 Developed By

**Srisajeenthran Sritharan**  
Full-Stack Software Engineer

- **Portfolio:** [sris-portfolio-six.vercel.app](https://sris-portfolio-six.vercel.app/)
- **GitHub:** [@Srisajeenthran](https://github.com/Srisajeenthran)
- **LinkedIn:** [Srisajeenthran Sritharan](https://www.linkedin.com/in/srisajeenthran-sritharan/)

---

## 📄 License
Open source under the [MIT License](LICENSE).
