# NexWork

**NexWork** (Next Generation Work) is a modern web platform that connects clients and freelancers for digital, project-based work. It enables clients to post jobs, manage contracts, define milestones, and review deliverables, while freelancers can browse opportunities, submit proposals, and track work through structured project phases.

---

## 🚀 Tech Stack

* **Frontend:** React (JavaScript, Vite)
* **Backend-as-a-Service:** Firebase

  * Authentication (Email/Password, Google)
  * Cloud Firestore (Database)
  * Firebase Storage (File uploads)
* **Hosting/Deployment:** Azure Static Web Apps
* **Link:** https://salmon-dune-05409a310.7.azurestaticapps.net/

---

## 📦 Features (Phase 1)

* User authentication (Register/Login)
* Role-based access (Client / Freelancer)
* Firestore user profiles
* Protected routes setup
* Basic client and freelancer dashboards
* Firebase project integration
* Azure deployment-ready structure

---

## 📦 Features (Phase 2 - Current)

* Job posting system
* Job browsing & search
* Proposal submissions

---

## 🏗️ Project Structure

```
src/
│
├── components/
|   ├── Dashboard.jsx
|   ├── Footer.jsx
|   ├── Header.jsx
|   ├── ProtectedRoute.jsx
|    
|
├── contexts/
│   └── AuthContext.jsx
|
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
|   ├── CompleteProfile.jsx
│   ├── ClientDashboard.jsx
|   ├── ClientJobs.jsx
|   ├── FreelancerDashboard.jsx
│   └── FreelancerJobs.jsx
│
├── hooks/
|   ├── useRoleRedirect.js
│
├── firebase/
│   └── firebase.js
|
├── services/
|   ├── authService.js
|
├── stylesheets/
|   ├── ClientDashboard.css
|   ├── CompletProfile.css
|   ├── Dashboard.css
|   ├── Footer.css
|   ├── Header.css
|   ├── LandingPage.css
|   ├── Register.css
│
├── App.jsx
└── main.jsx
```

---


## ⚙️ Installation & Running Locally

```bash
# Clone the repository
git clone https://github.com/DevQuestKhuselo/NEXWORK.git

# Navigate into the project
cd NEXWORK

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🧭 Roadmap

### Phase 1

* Authentication system
* Role-based users
* Firebase setup
* Basic dashboards

### Phase 2(Current)

* Job posting system
* Job browsing & search
* Proposal submissions

### Phase 3

* Contracts & milestones
* Deliverable uploads
* Approval workflow

### Phase 4

* Messaging system
* Notifications
* Reviews & ratings

### Phase 5

* Payments integration
* Advanced analytics
* AI job matching

---

## 💡 Vision

NexWork aims to simplify how digital work is discovered, managed, and delivered by combining structured workflows (milestones, contracts) with real-time collaboration tools.

---

## 📌 Author

Built by Khuselo Sofohlo

Computer Science Student | Software Developer | Aspiring Systems Builder
