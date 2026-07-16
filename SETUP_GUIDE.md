# FinFlow - How to Run on Your System

## Step 1: Software to Download and Install First

Install ALL of these before running the project.

---

### 1. Java Development Kit (JDK 17)
The backend is written in Java.
- Download: https://www.oracle.com/java/technologies/downloads/#java17
- Choose: Windows x64 Installer
- After installing, open Command Prompt and verify:
  java -version
  (Should show: java version "17.x.x")

---

### 2. Apache Maven 3.9+
Used to build and run the Spring Boot backend.
- Download: https://maven.apache.org/download.cgi
- Download: apache-maven-3.9.x-bin.zip
- Extract to C:\Program Files\Maven\
- Add to Windows PATH:
  1. Search "Environment Variables" in Windows Start
  2. Click Environment Variables
  3. Under System variables, find Path -> Click Edit
  4. Click New -> Add: C:\Program Files\Maven\apache-maven-3.9.x\bin
  5. Click OK on all windows
- Open a NEW Command Prompt and verify:
  mvn -version

---

### 3. MySQL Community Server 8.0
The database that stores all application data.
- Download: https://dev.mysql.com/downloads/mysql/
- During installation, set root password to: root123
- Leave port as: 3306
- MySQL will start automatically after installation.

---

### 4. Node.js 18+ (LTS)
Required to run the React frontend.
- Download: https://nodejs.org/en (Download LTS version)
- npm is installed automatically with Node.js
- Verify:
  node -version
  npm -version

---

## Step 2: Set Up the Database

1. Open MySQL Command Line Client (installed with MySQL)
2. Enter password: root123
3. Run:
   CREATE DATABASE IF NOT EXISTS expense_tracker;
4. Type: exit;

Spring Boot will automatically create all tables on first run.

---

## Step 3: Run the Backend (Spring Boot)

1. Extract the ZIP file
2. Open Command Prompt inside the Backend folder:
   cd path\to\ExpenseTracker\Backend
3. Run:
   mvn spring-boot:run
4. Wait for: "Started ExpenseTrackerApplication in X seconds"
5. Backend is now running at: http://localhost:8080

IMPORTANT: Keep this terminal window open!

---

## Step 4: Run the Frontend (React)

1. Open a SECOND new Command Prompt inside the Frontend folder:
   cd path\to\ExpenseTracker\Frontend
2. Install dependencies (only needed once):
   npm install
3. Start the development server:
   npm run dev
4. You will see: http://localhost:5173/

---

## Step 5: Open the Application

Open your browser and go to: http://localhost:5173

Register an account and the full application will work!

---

## Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| mvn is not recognized | Maven not in PATH | Restart Command Prompt after adding Maven to PATH |
| Communications link failure | MySQL not running | Start MySQL from Windows Services |
| Port 8080 already in use | Another app on port 8080 | Kill that process or change port in application.properties |
| ECONNREFUSED on frontend | Backend is not running | Start backend first, then frontend |
| npm install fails | Node.js not installed | Download and install Node.js LTS |

---

## Summary: What You Need

| Software    | Version  | Download |
|-------------|----------|----------|
| Java JDK    | 17+      | https://www.oracle.com/java/technologies/downloads/#java17 |
| Apache Maven| 3.9+     | https://maven.apache.org/download.cgi |
| MySQL       | 8.0      | https://dev.mysql.com/downloads/mysql/ |
| Node.js     | 18+ LTS  | https://nodejs.org/en |
