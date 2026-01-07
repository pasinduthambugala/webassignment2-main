
# 📚 Online Bookshop System (React + Node.js + MySQL)

This is a full-stack web application for an **Online Bookshop** developed as part of the **IT3113 Advanced Web Technologies** course. It integrates a third-party books API, supports user authentication, shopping cart functionality, and secure checkout—all backed by a MySQL database.(Developed for academic use under **IT3113 Advanced Web Technologies** coursework.)

---

## 🚀 Features

- 🔐 User Registration & Login with JWT authentication
- 🔎 Book search via **Google Books API**
- 📚 Create, update, delete, and view book records
- 🛒 Shopping cart with quantity updates and total calculation
- ✅ Checkout with shipping details and order confirmation
- 📦 Order management and persistence using MySQL
- 🔧 RESTful API built with Express and Node.js
- 🛡️ Middleware for error handling and authentication

---

## ⚙️ Technologies Used

- **Frontend:** React.js, Material-UI, Axios
- **Backend:** Node.js, Express.js, bcryptjs, JWT
- **Database:** MySQL
- **External API:** Google Books API
- **Session/Auth:** JWT with HTTP-only cookies

---

## 📁 Project Structure

```
BookStore/
│
├── backend/
│ ├── connections/ #DB Connection
│ ├── controllers/ # Logic for user, book, cart, order
│ ├── middleware/ # JWT auth, error handling
│ ├── models/ # DB models: User, Book, Order, etc.
│ ├── routes/ # API routes for auth, books, cart
│ ├── utils/ # Helper functions
│ ├── app.js # Express setup
│ 
├── frontend/
│ ├── public/ # Static files
│ ├── src/
│ │ ├── components/ # Pages, Reusable components (Navbar, Cards)
│ │ ├── context/ # Cart context/provider
│ │ ├── utils/ # API calls
│ │ ├── App.js # Routing setup
│ 
│
├── .env # Environment variables
├── package.json # Project dependencies

---

## 🔌 API Endpoints Overview

### 📘 Book APIs

| Method | Endpoint         | Description              | Body (JSON) |
|--------|------------------|--------------------------|-------------|
| GET    | `/`              | Home route               | – |
| POST   | `/create`        | Create new book          | `{ bookid, title, thumbnail, author, price, description }` |
| GET    | `/allbooks`      | Get all books            | – |
| GET    | `/book/:id`      | Get book by ID           | – |
| PUT    | `/update/:id`    | Update book by ID        | `{ bookid, title, thumbnail, author, price, description }` |
| DELETE | `/delete/:id`    | Delete book by ID        | – |

---

### 📦 Order APIs

| Method | Endpoint           | Description         | Body (JSON) |
|--------|--------------------|---------------------|-------------|
| POST   | `/order/checkout`  | Place an order      | `{ items: [{ bookId, quantity }] }` |
| GET    | `/order/history`   | Get order history   | – |

---

## 📌 Setup Instructions

### 📦 Backend Setup

1. Navigate to `/server`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env` for MySQL, JWT secret, and API keys.
4. Run backend:
   ```bash
   npm run dev
   ```

### 🌐 Frontend Setup

1. Navigate to `/client`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start frontend:
   ```bash
   npm run dev 
   ```

---

## ✅ Author
Thepuli Kavindhya


---
