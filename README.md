# Course Selling App Backend

A backend server for a course-selling platform built with **Node.js**, **Express**, **MongoDB**, **JWT**, **bcrypt**, and **Zod** for input validation.

---

## 🧩 Features

- Admin signup / signin with hashed passwords  
- JWT-based authentication for protected routes  
- CRUD operations for courses  
- Input validation using **Zod** schemas  
- Error handling for duplicate users, invalid data, etc.  
- Environment based configuration (using `.env`)  
- MongoDB data persistence using Mongoose  

---

## 🛠️ Tech Stack

| Layer        | Technology                |
|---------------|----------------------------|
| Backend       | Node.js, Express            |
| Database      | MongoDB + Mongoose           |
| Auth          | JWT, bcrypt                  |
| Validation    | Zod                          |
| Config        | dotenv                       |

---

## 🚀 Setup & Run Locally

1. Clone the repo  
   ```bash
   git clone https://github.com/ParthKadam11/Course_Selling_App_Backend.git
   cd Course_Selling_App_Backend

2.Install dependencies

npm install

3.Create a .env in the root with:

MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>

4.Start the server

node index.js

The server will connect to MongoDB and run on http://localhost:3000 (by default).

📦 API Endpoints

Here are sample endpoints your backend might expose:

Method	Route	Description	Protected
POST	/signup	Register a new admin or user with validation	No
POST	/signin	Login and receive a JWT	No
GET	/courses	List all courses	Optional
POST	/courses	Create a new course	Yes
PUT	/courses/:id	Update course details	Yes
DELETE	/courses/:id	Delete a course	Yes

Note: Add headers like Authorization: Bearer <token> when needed for protected routes.

🔧 Validation & Security

Zod schemas validate inputs before database operations to prevent bad data.

bcrypt is used to hash passwords before storing them.

JWT verifies client requests for protected actions.

Sensitive config values (Mongo URI, JWT secret) are kept outside code in .env.

🧠 What I Learned

How to structure a secure backend from scratch

Real-world use of password hashing and token authentication

Designing validation logic with Zod

How to connect and manage data with MongoDB + Mongoose

Handling errors and edge cases in API design

⚠️ Notes & Limitations

This is a learning / prototype project, not production-ready.

No rate limiting or advanced security features yet.

No image storage, file uploads, or payment integrations included.

Remember to never commit .env or secret keys to Git.

📂 Folder Structure (Example)
/
├── index.js
├── db.js
├── auth.js
├── package.json
├── package-lock.json
├── .gitignore
└── routes/
    ├── authRoutes.js
    └── courseRoutes.js

💬 Contributions & Feedback

If you find bugs or have suggestions, feel free to open an issue or pull request.
I’m always open to help, feedback, and collaborative improvements.
