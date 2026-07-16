<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,25,30&height=220&section=header&text=FinFlow&fontSize=90&fontAlignY=40&desc=Your%20money.%20Your%20rules.%20Your%20clarity.&descAlignY=62&animation=fadeIn&fontColor=ffffff" width="100%"/>

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Aiven-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://aiven.io)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Vercel](https://img.shields.io/badge/Hosted_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

<br/>

> *A full-stack personal finance tracker — track spending, set budgets, grow savings, and visualize your financial health with a beautiful glassmorphic dark UI.*

<br/>

**[🚀 Open Live App](https://expense-tracker-flax-ten-84.vercel.app) &nbsp;•&nbsp; [📡 API Docs](#-api-endpoints) &nbsp;•&nbsp; [💻 Run Locally](#-run-locally) &nbsp;•&nbsp; [🐛 Report Issue](https://github.com/B-Jai12/ExpenseTracker/issues)**

<br/>

</div>

---

## 🌟 What can FinFlow do?

<table>
<tr>
<td width="50%">

### 📊 Dashboard
- Live balance, income & expense stats
- Financial health score (0–100 gauge)
- 6-month cash flow area chart
- Category-wise spending pie chart
- 60+ rotating wisdom quotes (every 3 min)

### 💳 Transactions
- Add income & expenses in seconds
- 🧠 Intelligent merchant auto-detection
- Auto-categorizes Swiggy, Amazon, Netflix & 100+ more
- Filter by month, year, type, or category

</td>
<td width="50%">

### 🎯 Budgets
- Monthly budgets per spending category
- Visual progress bars with % used
- 🔴 Overspend alerts with exact amount
- Auto-switches view to the newly saved budget

### 💰 Savings & Bills
- Create savings goals with target amounts
- Track recurring bills & subscriptions
- Never miss a payment again

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
         User
          │
          ▼
  ┌───────────────────┐
  │  Vercel (Frontend) │  React 18 + Vite + TanStack Query
  │  Framer Motion     │  Glassmorphic Dark UI
  └────────┬──────────┘
           │  REST API (JWT Auth)
           ▼
  ┌───────────────────┐
  │  Render (Backend)  │  Spring Boot 3 + Java 17
  │  Docker Container  │  Spring Security + Hibernate
  └────────┬──────────┘
           │  JPA / Hibernate
           ▼
  ┌───────────────────┐
  │  Aiven (Database)  │  PostgreSQL (Cloud)
  │  Managed + SSL     │  Always-on, encrypted
  └───────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite 5, TanStack Query, Framer Motion, Recharts, Tailwind CSS |
| **Backend** | Spring Boot 3, Java 17, Spring Security, JWT, Spring Data JPA |
| **Database** | PostgreSQL (Aiven cloud managed) |
| **Hosting** | Vercel (frontend) + Render (backend) |
| **Auth** | Stateless JWT — tokens never stored server-side |

---

## 🚀 Live Deployment

| | Service | Link |
|---|---|---|
| 🌐 | **Frontend** | [expense-tracker-flax-ten-84.vercel.app](https://expense-tracker-flax-ten-84.vercel.app) |
| ⚙️ | **Backend API** | [expensetracker-vxzj.onrender.com/api](https://expensetracker-vxzj.onrender.com/api) |
| 📡 | **Health Check** | [/api/health](https://expensetracker-vxzj.onrender.com/api/health) |

> **⚠️ Free tier note:** Render spins down after 15 min inactivity. First request may take ~30s to wake up — totally normal for free hosting!

---

## 💻 Run Locally

### Requirements
- Java 17+ &nbsp;|&nbsp; Maven 3.8+ &nbsp;|&nbsp; Node 18+ &nbsp;|&nbsp; PostgreSQL 14+

### Steps

```bash
# 1. Clone
git clone https://github.com/B-Jai12/ExpenseTracker.git
cd ExpenseTracker

# 2. Start backend (auto-creates all DB tables!)
cd Backend
mvn spring-boot:run
# → Running on http://localhost:8080

# 3. Start frontend (open a new terminal)
cd Frontend
npm install
npm run dev
# → Running on http://localhost:5173
```

Open **http://localhost:5173** → Register → Done! 🎉

> No `.env` file needed for local dev — sensible defaults are built in.

---

## 📡 API Endpoints

Base URL: `https://expensetracker-vxzj.onrender.com/api`

<details>
<summary><b>🔐 Auth</b></summary>

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Login → returns JWT |

</details>

<details>
<summary><b>💳 Expenses (JWT required)</b></summary>

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/expenses` | All transactions |
| `POST` | `/expenses` | Create transaction |
| `PUT` | `/expenses/{id}` | Update transaction |
| `DELETE` | `/expenses/{id}` | Delete transaction |
| `GET` | `/expenses/filter/period?month=7&year=2026` | Filter by period |

</details>

<details>
<summary><b>🎯 Budgets (JWT required)</b></summary>

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/budgets` | All budgets |
| `POST` | `/budgets` | Create budget |
| `GET` | `/budgets/filter/period?month=7&year=2026` | Filter by period |
| `PUT` | `/budgets/{id}` | Update budget |
| `DELETE` | `/budgets/{id}` | Delete budget |

</details>

<details>
<summary><b>🏠 Dashboard & More (JWT required)</b></summary>

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/dashboard` | Full financial summary |
| `GET` | `/savings-goals` | All savings goals |
| `POST` | `/savings-goals` | Create savings goal |
| `GET` | `/bills` | All recurring bills |
| `POST` | `/bills` | Create bill |

</details>

> All protected endpoints require: `Authorization: Bearer <token>`

---

## 📁 Structure

```
ExpenseTracker/
├── Frontend/              ← React + Vite app
│   └── src/
│       ├── components/   ← Reusable UI (GlassCard, Button, Modal...)
│       ├── pages/        ← Dashboard, Expenses, Budgets, Savings, Bills, Reports
│       ├── services/     ← API layer + merchant intelligence
│       ├── constants/    ← Categories, months, 60 financial quotes
│       └── utils/        ← Helpers, formatters, health score
│
└── Backend/               ← Spring Boot app
    └── src/main/java/com/expensetracker/
        ├── controller/   ← REST endpoints
        ├── service/      ← Business logic
        ├── repository/   ← JPA queries
        ├── entity/       ← DB models
        ├── security/     ← JWT config
        └── dto/          ← Request/Response objects
```

---

## 🔐 Environment Variables

**Backend** (Render → Environment)

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://host:port/db?sslmode=require
SPRING_DATASOURCE_USERNAME=your_user
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your_256bit_secret_key
```

**Frontend** (Vercel → Settings → Environment Variables)

```env
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

---

## 🤝 Contributing

```bash
git checkout -b feat/your-feature
git commit -m "feat: describe your change"
git push origin feat/your-feature
# → Open a Pull Request
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,25,30&height=100&section=footer&animation=fadeIn" width="100%"/>

Made by **[Jaideep](https://github.com/B-Jai12)** &nbsp;•&nbsp; Give it a ⭐ if you like it!

[![GitHub](https://img.shields.io/badge/GitHub-B--Jai12-181717?style=for-the-badge&logo=github)](https://github.com/B-Jai12)

</div>
