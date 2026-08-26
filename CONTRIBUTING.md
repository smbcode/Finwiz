# Contributing to FinWiz Web Portal 🚀

Welcome to the **FinWiz NIT Warangal** open-source code repository! This guide is crafted to help developers, designers, and quant enthusiasts from NIT Warangal contribute effectively to our club portal.

---

## 🏛️ Project Architecture

The project is divided into two distinct, decoupled components:

```
Finwiz/
├── public/                 # Static assets (Vector logos, SVG icons, favicon)
├── src/                    # Frontend Application (React 19 + Vite)
│   ├── components/         # Modular, reusable React components
│   │   ├── auth/           # Login modal, onboarding form, profile badge
│   │   ├── common/         # Global Header, Footer, Background shaders
│   │   └── home/           # Hero, Ticker, About, FinHack timer, FinTalks, FAQ
│   ├── context/            # Global React Contexts (Auth, User State)
│   ├── pages/              # Routed view pages (HomePage, LoginPage, NoticesPage, HackathonPage)
│   ├── services/           # API Client layer & mock datasets for offline resilience
│   ├── styles/             # Modular CSS design system (Obsidian, Gold, Emerald tokens)
│   ├── App.jsx             # Route definitions & global layout wrappers
│   └── main.jsx            # Application entrypoint
│
└── Backend/                # Backend API (Node.js + Express + MongoDB)
    ├── config/             # DB connection logic
    ├── controllers/        # Request handlers & business logic
    ├── middleware/         # JWT verification & RBAC guards
    ├── models/             # Mongoose database schemas (User, HackathonTeam, Notice)
    ├── routes/             # RESTful API route definitions (/api/auth, /api/notices, etc.)
    └── server.js           # Express app server entrypoint
```

---

## 🛠️ Getting Started Locally

### 1. Frontend Setup
```bash
# In the root directory:
npm install

# Start the Vite development server:
npm run dev
```
Open `http://localhost:5173` in your browser.

### 2. Backend Setup
```bash
# Navigate to the Backend folder:
cd Backend

# Install dependencies:
npm install

# Start the Node.js development server:
npm run dev
# Or run with node:
node server.js
```
The backend server runs on `http://localhost:5000`.

---

## 💡 Key Design & Code Conventions

1. **FinTech Theme & Colors**:
   - Dark Obsidian: `#07090e`, `#0d111a`
   - FinTech Gold Accent: `#f59e0b`, `#fbbf24` (use `.gradient-text-gold` or `--gold-400`)
   - Emerald Neon: `#10b981`, `#34d399` (use `.gradient-text-emerald` or `--emerald-400`)
   - Glassmorphism: `.glass-card`

2. **Offline / Dev First**:
   - Every API request in `src/services/api.js` is wrapped with a timeout and fallback to `src/services/mockData.js`.
   - Google OAuth supports an instant **Dev / Demo Mode** when no Google Client ID is configured.

3. **Authentication & Onboarding Flow**:
   - `AuthContext.jsx` manages `user`, `token`, `isOnboarded`, and triggers `OnboardingModal.jsx` for any new student logging in.

4. **Git Branching Strategy**:
   - `main`: Production-ready code.
   - `feature/<feature-name>`: Create a branch for your new feature (e.g. `feature/mock-trading-terminal`).
   - Submit clean Pull Requests with screenshots of your changes.

---

## 👥 Need Help?
Reach out to the **FinWiz Technical Team** at [finwiz@student.nitw.ac.in](mailto:finwiz@student.nitw.ac.in) or drop a message in the `#dev-wing` channel on our official Discord!
