# ContactManager

ContactManager is a full-stack web application where users can create, manage, and organize their contacts in one place.
It includes secure login and registration, the ability to add, edit, and delete contacts, mark favorites, and quickly search through saved contacts.

## 🧰 Tech Stack Used

**Frontend:** React, Vite, TailwindCSS, Axios, React Router  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JWT (JSON Web Tokens), bcrypt  
**Security:** Helmet, CORS  
**Deployment:** GitHub, Render, Vercel

---

## ✨ Features
- 🔐 **User Authentication:** Secure register and login functionality  
- 👤 **Contact Management:** Add, edit, and delete contacts easily  
- ⭐ **Favorites:** Mark important contacts for quick access  
- 🔎 **Real-time Search:** Instantly find contacts by name, phone, or email  
- 📄 **Pagination:** Navigate large contact lists smoothly  
- ✅ **Form Validation:** Prevent invalid data with frontend validation  
- 🛡 **Secure API:** Protected routes with JWT authentication  
- 🎯 **Clean Dashboard:** Modern and user-friendly interface

## ⚙️ Installation / Setup

### 1️⃣ Clone project
```bash
git clone https://github.com/your-username/contact-manager.git
cd contact-manager
```
### 2️⃣ Setup Backend Environment variables 
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
### 4️⃣ Setup Backend
```bash
cd backend
npm install
npm run dev
```

---

## 🏗️ Architecture
```text
contact-manager/
│
├─ backend/
│  ├─ package.json
│  ├─ .env
│  ├─ .gitignore
│  │
│  ├─ src/
│  │  ├─ app.js
│  │  ├─ server.js
│  │
│  │  ├─ config/
│  │  │   └─ db.js
│  │  │
│  │  ├─ models/
│  │  │   ├─ user.model.js
│  │  │   └─ contact.model.js
│  │  │
│  │  ├─ routes/
│  │  │   ├─ auth.routes.js
│  │  │   └─ contact.routes.js
│  │  │
│  │  ├─ controllers/
│  │  │   ├─ auth.controller.js
│  │  │   └─ contact.controller.js
│  │  │
│  │  ├─ middleware/
│  │  │   ├─ auth.middleware.js
│  │  │   └─ error.middleware.js
│  │  │
│  │  └─ utils/
│  │      └─ generateToken.js
│
├─ frontend/
│  ├─ package.json
│  ├─ index.html
│  ├─ vite.config.js
│  │
│  └─ src/
│     ├─ main.jsx
│     ├─ App.jsx
│     │
│     ├─ api/
│     │   └─ axios.js
│     │
│     ├─ context/
│     │   └─ AuthContext.jsx
│     │
│     ├─ components/
│     │   ├─ Navbar.jsx
│     │   └─ EditContactModal.jsx
│     │
│     ├─ pages/
│     │   ├─ Login.jsx
│     │   ├─ Register.jsx
│     │   ├─ Dashboard.jsx
│     │   └─ ContactForm.jsx
│     │
│     └─ assets/
│
└─ README.md
```





