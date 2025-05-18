# 📝 ToDo App (Full-Stack Testable Application)

This project is a simple ToDo application developed using Node.js and Express. It is fully testable and includes both backend and frontend components.

---

## 📦 Project Features

- ✅ RESTful API built with Express.js
- ✅ HTML + JavaScript frontend (public/index.html)
- ✅ Persistent task storage using SQLite (via Sequelize ORM)
- ✅ Unit tests using Jest
- ✅ API tests using Supertest
- ✅ Selenium-based UI automation test
- ✅ Manual API testing using Postman
- ✅ Auto-running unit tests when project starts (`npm start`)

---

## 🚀 Installation & Running

```bash
npm install
npm start
```

This will:
1. Run all unit tests (using a clean SQLite database for each run)
2. Start the Express server at `http://localhost:5000`
3. Serve the frontend via `public/index.html`

---

## 🗄️ Database

- The app uses **SQLite** for persistent storage, managed via **Sequelize** ORM.
- The database file is created automatically at `backend/database.sqlite`.
- No manual setup is required; tables are created automatically on first run.

---

## 🧪 Testing

### ✅ Unit Tests (Jest)
```bash
npm test
```

### ✅ Coverage Report
```bash
npm test -- --coverage
```

### ✅ Selenium UI Test
```bash
node uiTest.js
```

> Note: Make sure the server is running (`npm start`) before executing the Selenium test.

---

## 📬 API Endpoints

| Method | Endpoint      | Description         |
|--------|---------------|---------------------|
| GET    | /tasks        | List all tasks      |
| POST   | /tasks        | Add a new task      |
| DELETE | /tasks/:id    | Delete a task       |
| PATCH  | /tasks/:id    | Update a task       |

---

## 🔍 Technologies Used

- Node.js
- Express
- Sequelize (ORM)
- SQLite
- Jest
- Supertest
- Selenium WebDriver
- Postman
- HTML/CSS/JavaScript (Vanilla)

---

## 👨‍🎓 Developer Note

> This project was built for learning and demonstration purposes, focusing on testing, API validation, and frontend-backend integration.  
> **All code, test cases, and automation scripts were written by the student.**
> 
> **Note:** The app was refactored to use SQLite via Sequelize for persistent storage instead of in-memory arrays. All tests and endpoints now operate on the database.
