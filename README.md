# Event Registration Backend

This repository contains the backend of the **Event Registration System**, built using **Node.js**, **Express**, and **MongoDB**. It provides REST APIs to manage event registrations, including create, view (with pagination & search), delete, and export data to Excel.

---

## 🚀 Features

* Create event registrations
* Fetch registrations with **pagination** and **search**
* Delete registrations
* Export registrations to **Excel (.xlsx)**
* MongoDB Atlas integration
* CORS enabled for frontend integration

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB Atlas**
* **Mongoose**
* **ExcelJS**
* **CORS**

---

## 📁 Project Structure

```
backend/
│── models/
│   └── Registration.js
│── db.js
│── server.js
│── .env
│── .gitignore
│── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend root and add:

```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

⚠️ **Do not commit `.env` to GitHub**

---

## 📦 Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/vaishnavichattarbandh/event-registration-backend.git
cd event-registration-backend
```

2. Install dependencies

```bash
npm install
```

3. Start the server

```bash
npm start
```

Server will run at:

```
http://localhost:5000
```

---

## 🔌 API Endpoints

### Test API

```
GET /api/test
```

Response:

```json
{ "message": "Backend is connected!" }
```

---

### Create Registration

```
POST /api/registrations
```

Request Body (JSON):

```json
{
  "eventName": "Tech Fest",
  "fullName": "John Doe",
  "rollNo": "123",
  "department": "CSE",
  "stream": "Engineering",
  "year": "3",
  "semester": "6",
  "email": "john@example.com",
  "contact": "9876543210"
}
```

---

### Fetch Registrations (Pagination + Search)

```
GET /api/registrations?page=1&limit=5&search=Tech
```

---

### Delete Registration

```
DELETE /api/registrations/:id
```

---

### Export to Excel

```
GET /api/registrations/export
```

Downloads `registrations.xlsx`

---

## ✅ Status

✔ Backend tested locally
✔ MongoDB connected successfully
✔ Ready for frontend integration

---

## 👩‍💻 Author

**Vaishnavi Chattarbandh**

---

## 📄 License

This project is for educational purposes.
