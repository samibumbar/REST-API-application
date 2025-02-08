# 📌 REST API for Contact Management

## 📖 Description

This is a REST API built with **Node.js, Express, and MongoDB**, allowing users to manage their personal contacts. Features include **authentication, authorization, pagination, filtering**, and **user subscription management**.

---

## 🚀 Setup and Installation

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/user/repository.git
cd repository
```

### 🔹 2. Install Dependencies

```bash
npm install
```

### 🔹 3. Create a `.env` File

Create a `.env` file in the project root and add the following environment variables:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/db-contacts
JWT_SECRET=supersecrettoken
PORT=3000
```

### 🔹 4. Start the Server

```bash
npm start
```

Or in development mode (with `nodemon`):

```bash
npm run dev
```

---

## 📌 API Endpoints and Testing Methods

### 🔹 **1. User Registration**

**POST** `/api/users/signup`

```json
{
  "email": "test@example.com",
  "password": "Test1234!"
}
```

✅ **Response:**

```json
{
  "user": { "email": "test@example.com", "subscription": "starter" }
}
```

❌ **Error 409 (email already in use):** `{ "message": "Email in use" }`

---

### 🔹 **2. User Login**

**POST** `/api/users/login`

```json
{
  "email": "test@example.com",
  "password": "Test1234!"
}
```

✅ **Response:**

```json
{
  "token": "JWT_TOKEN",
  "user": { "email": "test@example.com", "subscription": "starter" }
}
```

---

### 🔹 **3. Get Current User**

**GET** `/api/users/current`
**Headers:**

```plaintext
Authorization: Bearer JWT_TOKEN
```

✅ **Response:**

```json
{
  "email": "test@example.com",
  "subscription": "starter"
}
```

---

### 🔹 **4. User Logout**

**POST** `/api/users/logout`
**Headers:**

```plaintext
Authorization: Bearer JWT_TOKEN
```

✅ **Response:**

```json
{
  "message": "User successfully logged out"
}
```

---

### 🔹 **5. Add a Contact**

**POST** `/api/contacts`
**Headers:**

```plaintext
Authorization: Bearer JWT_TOKEN
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "123-456-7890",
  "favorite": true
}
```

✅ **Response:**

```json
{
  "_id": "CONTACT_ID",
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "123-456-7890",
  "favorite": true,
  "owner": "USER_ID"
}
```

---

### 🔹 **6. Get User Contacts (Authentication Required)**

**GET** `/api/contacts?page=1&limit=5`
**Headers:**

```plaintext
Authorization: Bearer JWT_TOKEN
```

✅ **Response:**

```json
[
  {
    "_id": "CONTACT_ID",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "123-456-7890",
    "favorite": true,
    "owner": "USER_ID"
  }
]
```

---

### 🔹 **7. Filter Favorite Contacts**

**GET** `/api/contacts?favorite=true`
✅ **Response:**

```json
[
  {
    "_id": "CONTACT_ID",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "123-456-7890",
    "favorite": true,
    "owner": "USER_ID"
  }
]
```

---

### 🔹 **8. Update User Subscription**

**PATCH** `/api/users/subscription`
**Headers:**

```plaintext
Authorization: Bearer JWT_TOKEN
```

**Body:**

```json
{
  "subscription": "pro"
}
```

✅ **Response:**

```json
{
  "message": "Subscription updated successfully",
  "subscription": "pro"
}
```

---

## 📌 🛠 Technologies Used

- **Node.js** + **Express.js**
- **MongoDB + Mongoose**
- **JWT for authentication**
- **Bcrypt for password hashing**
- **Postman for API testing**

---

## 📌 📞 Support and Contribution

If you have any questions or suggestions, feel free to open an **issue** or contribute to the project with a **pull request**. 🚀
