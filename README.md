# 🚀 Skill2Hire - AI-Powered Recruitment Platform

[![MERN Stack](https://img.shields.io/badge/MERN-Stack-000000?style=for-the-badge&logo=mongodb&logoColor=green)](https://github.com/AnkitGit-prog/skill2hire)
[![AI Integration](https://img.shields.io/badge/AI-Powered-FF4500?style=for-the-badge&logo=openai&logoColor=white)](https://groq.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**Skill2Hire** is a next-generation job portal and recruitment platform designed to streamline the hiring process using Artificial Intelligence. It features an intelligent **Resume Analyzer** that scores candidates against job descriptions, suggesting improvements and highlighting strengths.

---

## 🌟 Key Features

- **🤖 AI Resume Analysis**: Automatically evaluates resumes using **Groq (Llama 3)** & **Gemini** to provide detailed feedback, scores, and missing keywords.
- **🔐 Secure Authentication**: Robust JWT-based authentication with role-based access control (Admin vs. User).
- **💼 Job Management System**: Admins can post, edit, and manage job listings efficiently.
- **📄 PDF Parsing**: Built-in support for extracting text from PDF resumes for analysis.
- **⚡ High Performance**: Built on **Vite** + **React** for a blazing fast frontend experience.
- **🎨 Modern UI**: Responsive design using **Bootstrap** and **Framer Motion** for smooth animations.

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### AI & Tools
![Groq](https://img.shields.io/badge/Groq-API-orange?style=for-the-badge)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## 🔄 System Workflow

The following diagram illustrates how the Resume Analysis feature works:

```mermaid
graph TD
    subgraph Client
        U[User / Admin] -->|Interacts| UI[React Frontend]
    end

    subgraph Server
        UI -->|HTTP Requests| API[Express API]
        API -->|Auth| A[Auth Controller]
        API -->|Jobs| J[Job Controller]
        API -->|Resume| R[Resume Controller]
    end

    subgraph Database
        A <-->|Read/Write User Data| DB[(MongoDB)]
        J <-->|Read/Write Job Data| DB
    end

    subgraph External_Services
        R -->|Extract Text| P[PDF Parser]
        R -->|Analyze Text| AI[Groq API / Gemini]
    end

    %% Flows
    A -->|Issue JWT| UI
    J -->|Job Listings| UI
    P -->|Raw Text| R
    AI -->|Analysis JSON| R
    R -->|Feedback & Score| UI

    %% Styling
    classDef client fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef server fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    classDef db fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px;
    classDef ext fill:#f3e5f5,stroke:#4a148c,stroke-width:2px;

    class U,UI client;
    class API,A,J,R server;
    class DB db;
    class P,AI ext;
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Atlas or Local)
- Groq API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnkitGit-prog/skill2hire.git
   cd skill2hire
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```
   *Create a `.env` file in `server/` root:*
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   GROQ_API_KEY=your_groq_api_key
   ```
   *Start the server:*
   ```bash
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```
   *Start the client:*
   ```bash
   npm run dev
   ```

---

## 👥 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/AnkitGit-prog">Ankit Tiwari</a>
</p>
