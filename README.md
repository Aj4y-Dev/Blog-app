# Blogify - Modern Blog Application

Blogify is a full-stack blogging platform built with a focus on simplicity, responsiveness, and clean architecture. It allows users to create, read, and manage blog posts, while providing administrators with advanced user management capabilities.

## 🚀 Features

- **JWT Authentication**: Secure user login and signup with token-based authentication.
- **Blog Management**: Create, edit, and delete blogs with image upload support.
- **Admin Dashboard**: Specialized view for administrators to manage all users and content.
- **Responsive Design**: Built with Bootstrap 5 to ensure a seamless experience on mobile, tablet, and desktop.
- **MVC Architecture**: Clean separation of concerns between Models, Views, and Controllers.

## 🏗️ Architecture

The system follows the **Model-View-Controller (MVC)** design pattern:

- **Models**: Built using **Mongoose**, defining schemas for Users and Blogs.
- **Views**: Rendered server-side using **EJS (Embedded JavaScript)** templates.
- **Controllers**: Handle business logic, processing requests and interfacing with the database.
- **Middleware**: Manages authentication (JWT) and authorization (Role-based access).

### Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **Authentication** | JSON Web Tokens (JWT), Cookie-parser |
| **View Engine** | EJS |
| **File Handling** | Multer |
| **Style** | Bootstrap 5, Custom CSS |

---

## 🛣️ Route Summary

### 🔑 Authentication & Authorization
| Method | Route | Description |
| :--- | :--- | :--- |
| POST | `/api/v1/signup` | Register a new user |
| POST | `/api/v1/login` | Authenticate user and set token |
| GET | `/api/v1/logout` | Clear user session token |

### 📝 Blog Management
| Method | Route | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/` | View all published blogs | Public |
| GET | `/blog/:id` | View full blog content | Authenticated |
| GET | `/blog/add-new` | Page to create a blog | Authenticated |
| POST | `/blog` | Submit new blog with image | Authenticated |
| GET | `/blog/edit/:id` | Page to modify blog | Owner/Admin |
| POST | `/blog/update/:id` | Submit blog updates | Owner/Admin |
| GET | `/blog/delete/:id` | Remove a blog post | Owner/Admin |

### 🛡️ Admin Dashboard
| Method | Route | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/dashboard`| Overview of users and blogs | Admin Only |
| GET | `/dashboard/edit/:id` | Modify user account details | Admin Only |
| PUT | `/dashboard/update/:id` | Submit user account changes | Admin Only |
| DELETE | `/dashboard/delete/:id` | Permanently remove user | Admin Only |

---

## 📂 Project Structure

```text
Blog-app/
├── public/                # Static files (images, uploads)
├── src/
│   ├── config/            # Database connection logic
│   ├── controllers/       # Business logic handlers
│   ├── middleware/        # Auth and security logic
│   ├── model/             # Mongoose schemas
│   ├── routes/            # Route definitions
│   └── views/             # EJS templates & partials
├── server.js              # Application entry point
├── .env                   # Environment variables
└── package.json           # Dependencies and scripts
```

## 🛠️ Getting Started

1. **Install dependencies**: `npm install`
2. **Setup environment**: Create a `.env` file with `MONGO_URI`, `PORT`, and `JWT_SECRET`.
3. **Start the server**: `npm run dev` or `node server.js`
