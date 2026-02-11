# 🇧🇩 Smart National Election Portal (Prototype)
**An Interactive Digital Voting System built with HTML, CSS, and JavaScript.**

## 📅 Project Roadmap: Week 1 (Frontend Foundation)
This week focused on building a responsive, accessible, and secure-looking User Interface.

### 🛠️ Lead Developer Updates (Serial 01-04)
- **Update 01:** Established Global CSS variables, Glassmorphism design language, and layout architecture.
- **Update 02:** Implemented the Symbol Grid system and interactive radio-card components for the ballot.
- **Update 03:** Developed the Authentication Logic (Login/Signup toggles) and NID/PIN validation algorithms.
- **Update 04:** Built the Ballot Submission engine and session reset flow.

## 👥 Team Contributions
- **Nahin 1401:** Core UI Architecture & Validation Logic 
- **Anik  1243:** Voter Portal UI & Asset Management 
- **Mamun 1245:** Admin Dashboard & Real-time Visualization 

## 🚀 Installation
1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. Use an 8-digit NID and 4-digit PIN to test the validation.






# 🇧🇩 National E-Voting Portal: Phase II (Development & Scaling)
**An Enterprise-grade Digital Election System with Real-Time Analytics.**

---

## 🚀 Phase Overview
Following the successful UI/UX foundation in Week 1, this phase focuses on the **Full-Stack Integration**, **Database Security**, and **Live Data Visualization**.

---

## 📅 Development Roadmap

### 🧱 Week 2: Backend Architecture & Core APIs
*Focus: Turning static pages into a dynamic system.*
- **Nahin 1401:** Initialized Node.js/Express server and established MongoDB connection. Developed RESTful APIs for `Auth` and `Vote Submission`.
- **Anik  1243:** Integrated Voter UI with backend endpoints using `fetch()`. Added dynamic state management for the 14-symbol ballot.
- **Mamun 1245:** Connected Admin Dashboard to the live results API (`/api/admin/results`). Implemented automatic data polling.




### 🔐 Week 3: Security & Fraud Prevention
*Focus: Protecting the integrity of the ballot.*
- **Nahin 1401:** Implemented server-side "Double Voting" checks. Once an NID is flagged as `hasVoted: true`, the API rejects further attempts.
- **Anik  1243:** Added multi-stage verification logic (NID length validation and PIN masking) to the frontend.
- **Mamun 1245:** Developed the "Security Audit Trail" on the dashboard to monitor login attempts and voter registration in real-time.


  

### 📱 Week 4: Network Hosting & Optimization
*Focus: Multi-device testing and final polish.*
- **Nahin 1401:** Configured the server for Local Area Network (LAN) hosting (via `192.168.0.x`). Optimized database queries for speed.
- **Anik  1243:** Finalized "Responsive Design" to ensure voters can cast ballots from mobile phones and tablets.
- **Mamun 1245:** Polished Chart.js animations and added "Export Results" functionality for election officers.

---

## 🛠️ Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Glassmorphism), JavaScript (ES6+) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (NoSQL) |
| **Visuals** | Chart.js (Live Data Rendering) |

---

## 🔌 API Endpoints (Internal)
- `POST /api/signup`: Registers a new digital identity.
- `POST /api/login`: Validates NID/PIN credentials.
- `POST /api/vote`: Securely records ballot choice and locks the identity.
- `GET /api/admin/results`: Aggregates live data for the Election Commission.

---

## 🛡️ Security Features
1. **Immutable Records:** Once a vote is cast, the database entry is locked.
2. **Session Sanitization:** Sensitive voter info is cleared upon portal exit.
3. **Audit Logging:** Admin dashboard tracks every authentication event.
