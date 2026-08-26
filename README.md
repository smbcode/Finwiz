# ⚡ FinWiz · Finance & FinTech Club, NIT Warangal

The official web portal and platform for **FinWiz - The Finance & FinTech Club of the National Institute of Technology, Warangal**.


---

## 🌟 Features

- **Dynamic FinTech Home Page**:
  - Live animated market & club news ticker.
  - Interactive hero section with simulated quant terminal and animated stats counter.
  - Core domain verticals (Algorithmic Trading, DeFi & Web3, Investment Banking, FinTech Dev).
  - FinHack 2026 flagship event card with live countdown clock.
  - Notice board teaser, identity pillars, and interactive FAQ accordion.
- **Unified Global Navigation & Footer**:
  - Responsive header with glowing vector brand logo, quick route links, and student profile dropdown.
  - Comprehensive footer with NIT Warangal location, social links, newsletter dispatch, and technical team credits.
- **Enterprise-Grade Authentication**:
  - **Google OAuth**: One-click secure sign-in.
  - **Student Onboarding**: One-time capture of NITW Roll Number, Phone Number, Branch, and Domain interests upon initial login.
  - **Team Login**: Team Name + bcrypt-hashed shared password for Hackathon team members.
  - **Zero-Setup Dev Mode**: Instant mock student & admin login for rapid offline development.
- **Notice Board Bulletin (`/notices`)**:
  - Category filters (Hackathon, Session, Recruitment, Workshop), keyword search, and detailed circular modal.
- **FinHack 2026 Portal (`/hackathon`)**:
  - Competition tracks, eligibility, prize breakdown, and team registration form.
- **Robust Node.js & MongoDB Backend**:
  - Modular Express REST API with JWT verification, role-based guards, Mongoose models (`User`, `HackathonTeam`, `Notice`), and in-memory failover.

---

## 🚀 Quick Start

### 1. Frontend
```bash
npm install
npm run dev
```

### 2. Backend
```bash
cd Backend
npm install
npm start
```

---

## 🤝 Contributing
Refer to [`CONTRIBUTING.md`](./CONTRIBUTING.md) for detailed folder structure, code style rules, and PR guidelines.

---

*FinWiz · National Institute of Technology, Warangal · Telangana - 506004*
