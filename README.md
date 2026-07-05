# Trade Flow

Trade Flow is a **full-stack stock trading platform** that provides users with a simulated environment to buy, sell, and track stocks in real-time. The project demonstrates scalable microservices architecture, secure JWT authentication, REST API design, and the integration of live financial market data into a real-world web application.

The application follows a **microservices architecture**, decoupling the marketing site (Frontend) from the core trading engine (Dashboard). Both React applications communicate securely with a centralized **Node.js/Express** REST API backend, which orchestrates database transactions and caches live market data.

---

# ✨ Highlights

- 🔐 JWT Authentication with HTTP-Only Cookies
- 📈 Real-Time Stock Price Fetching (Finnhub API)
- 🚀 In-Memory API Caching for Rate Limit Protection
- 🐳 Fully Containerized Microservices (Docker)
- ⚙️ Automated CI/CD Pipeline (GitHub Actions)
- ☁️ Serverless Cloud Deployment (Azure Container Apps)
- 🧱 Decoupled Frontend and Dashboard Applications

---

# Overview

Trade Flow enables users to create accounts, view their portfolio of holdings and open positions, track daily P&L, and execute simulated Buy/Sell market orders using live stock prices. 

Beyond traditional CRUD functionality, the project emphasizes enterprise DevOps practices, secure identity management, modular service design, and strict CORS policies across distributed cloud environments.

---

# 🏗️ System Architecture

```text
               Client Browser
                     │
           ┌─────────┴─────────┐
           ▼                   ▼
    Frontend Service      Dashboard Service
    (Nginx + React)       (Nginx + React)
           │                   │
           └─────────┬─────────┘
                     ▼
             REST API Requests
             (JWT Authenticated)
                     │
             Node.js / Express
               Backend API
                     │
           ┌─────────┴─────────┐
           ▼                   ▼
      MongoDB Atlas       Finnhub API
      (Database)        (Market Data)
```

---

# 📊 Trading Engine Pipeline

The trading engine processes user orders through a multi-stage validation and execution pipeline.

```text
[User Submits Order]
          │
          ▼
   JWT Token Validation
          │
          ▼
  Live Price Verification (Finnhub)
          │
          ▼
  In-Memory Cache Check / Update
          │
          ▼
  Balance & Holdings Validation
          │
          ▼
  MongoDB Transaction Execution
          │
          ▼
  Portfolio State Updated
```

## 1. Market Data & Caching
- **Finnhub API** is queried to verify the live price of a stock before any order is executed.
- An **In-Memory Cache** intercepts repeated requests for the same stock ticker, returning the cached price to drastically reduce external API latency and prevent rate-limiting.

## 2. Order Validation
- **Sell Orders** are strictly validated against the user's current MongoDB `HoldingsModel` to ensure they possess adequate quantity before execution.
- **Buy Orders** dynamically calculate the new average buy price and seamlessly merge the new quantity with existing holdings.

---

# 💻 Technology Stack

## Frontend (Marketing Site)
- React.js
- React Router DOM
- Bootstrap
- Axios
- Nginx

## Dashboard (Trading Engine)
- React.js
- Material UI (MUI)
- Chart.js
- Axios
- Nginx

## Backend (Node.js / Express)
- Node.js
- Express.js
- MongoDB / Mongoose
- JSON Web Tokens (JWT)
- Cookie-Parser
- Helmet
- Jest & Supertest (Unit Testing)

## Cloud & DevOps
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- DockerHub Registry
- Microsoft Azure Container Apps

---

# 🔑 Key Features

## 🔐 Secure Authentication
- JWT Authentication
- HTTP-Only Secure Cookies
- Protected Dashboard Routes
- Cross-Origin Resource Sharing (CORS) Security

## 📈 Portfolio Management
- Track Total Holdings & Open Positions
- Calculate Net P&L and Day P&L
- Interactive Charts

## ⚙️ Enterprise DevOps
- Independent Dockerfiles for all 3 microservices
- Local orchestration via Docker Compose
- Automated Unit Tests run on GitHub push
- Automated Docker Image Tagging & Registry Push
- True Continuous Deployment (CD) using Azure CLI via GitHub Actions

---

# 📂 Project Structure

```text
Trade-Flow/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── nginx.conf
│   └── Dockerfile
│
├── dashboard/
│   ├── public/
│   ├── src/
│   ├── nginx.conf
│   └── Dockerfile
│
├── backend/
│   ├── Middlewares/
│   ├── Models/
│   ├── Routes/
│   ├── tests/
│   ├── index.js
│   └── Dockerfile
│
├── .github/workflows/
│   └── ci.yml
│
└── docker-compose.yml
```

---

# 🚀 Installation & Setup

## Prerequisites
- Node.js
- Docker & Docker Compose
- MongoDB Atlas Account
- Finnhub API Key

---

## Clone the Repository

```bash
git clone https://github.com/Harsh-15771/Trade-Flow.git
cd Trade-Flow
```

---

## Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=3002
MONGO_URL=your_mongodb_connection_string
FINNHUB_API_KEY=your_finnhub_api_key
JWT_SECRET=your_jwt_secret
```

---

## Run with Docker Compose (Recommended)

The easiest way to run the entire microservices cluster is using Docker Compose.

```bash
docker compose up --build
```
- Frontend: `http://localhost:3000`
- Dashboard: `http://localhost:3001`
- Backend API: `http://localhost:3002`

---

## Run Manually (Without Docker)

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Dashboard Setup
```bash
cd dashboard
npm install
npm start
```

---

# 🔮 Future Improvements

- PostgreSQL Migration for Strict ACID Database Transactions
- Centralized Redis Caching Cluster
- WebSocket Integration for Live Tick Data
- Express Rate Limiting for Auth Routes
- OAuth2.0 Google Login Integration

---

# 👨‍💻 Author

**Harsh Mishra**

Full-Stack Developer | Cloud & DevOps Enthusiast

---

> This project demonstrates modern cloud-native development by combining secure authentication, scalable microservices, automated CI/CD pipelines, and enterprise-grade deployment on Microsoft Azure.
