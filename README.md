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

---

## 📦 Features (Phase 1 - Current)

* User authentication (Register/Login)
* Role-based access (Client / Freelancer)
* Firestore user profiles
* Protected routes setup
* Basic client and freelancer dashboards
* Firebase project integration
* Azure deployment-ready structure

---

## 🏗️ Project Structure

```
src/
│
├── components/
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
│   └── FreelancerDashboard.jsx
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
|   ├── CompletProfile.css
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

NexWork aims to simplify how digital work is discovered, managed, and delivered by combining structured workflows (milestones, contracts) with real-time collaboration tools.(base) vmuser@reference2025:~/Desktop/NexWork$ echo "# NEXWORK" >> README.md
(base) vmuser@reference2025:~/Desktop/NexWork$ git init
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint: 
hint:   git config --global init.defaultBranch <name>
hint: 
hint: Names commonly chosen instead of 'master' are 'main', 'trunk' and
hint: 'development'. The just-created branch can be renamed via this command:
hint: 
hint:   git branch -m <name>
Initialized empty Git repository in /home/vmuser/Desktop/NexWork/.git/
(base) vmuser@reference2025:~/Desktop/NexWork$ git add .
(base) vmuser@reference2025:~/Desktop/NexWork$ git commit -m "First Commit of the Project"
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'vmuser@reference2025.(none)')
(base) vmuser@reference2025:~/Desktop/NexWork$ git config --global user.email 2729931@students.wits.ac.za
(base) vmuser@reference2025:~/Desktop/NexWork$ git config --global user.email "2729931@students.wits.ac.za"
(base) vmuser@reference2025:~/Desktop/NexWork$ git config --global user.name "KhuseloDevQuest"
(base) vmuser@reference2025:~/Desktop/NexWork$ git branch -M main
(base) vmuser@reference2025:~/Desktop/NexWork$ git remote add origin https://github.com/KhuseloDevQuest/NEXWORK.git
(base) vmuser@reference2025:~/Desktop/NexWork$ git push -u origin main
error: src refspec main does not match any
error: failed to push some refs to 'https://github.com/KhuseloDevQuest/NEXWORK.git'

---

## 📌 Author

Built by Khuselo Sofohlo

Computer Science Student | Software Developer | Aspiring Systems Builder
