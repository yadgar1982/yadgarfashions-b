# ⚙️ Yadgar Fashions - Backend

Backend REST API for the Yadgar Fashions MERN Stack E-commerce Platform.

This backend powers the entire application, including authentication, product management, order processing, payment integration, image storage, email notifications, and administration.

---

## 🌍 About

Yadgar Fashions is a full-stack MERN e-commerce platform developed to sell authentic Afghan clothing worldwide.

The backend is built with **Node.js**, **Express**, and **MongoDB**, following RESTful API architecture.

---

## ✨ Features

- RESTful API
- JWT Authentication
- User Registration & Login
- Role-Based Authorization
- Product Management
- Category Management
- Order Management
- Customer Management
- Shopping Cart API
- Stripe Payment Integration
- PayPal Payment Integration
- AWS S3 Image Upload
- Email Notifications
- Password Reset
- Rate Limiting
- Helmet Security
- CORS Protection
- Scheduled Cron Jobs
- Secure Password Hashing
- File Upload Support
- Logging
- Environment Configuration

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication

- JWT
- bcryptjs

### Security

- Helmet
- Express Rate Limit
- CORS
- Cookie Parser

### Storage

- AWS S3
- Multer
- Multer S3

### Payments

- Stripe
- PayPal

### Email

- Nodemailer

### Scheduling

- Node Cron

---

## 📦 Main Packages

- Express
- Mongoose
- JWT
- bcryptjs
- Helmet
- Express Rate Limit
- AWS SDK
- Multer
- Stripe
- PayPal
- Nodemailer
- Axios

---

## 📁 Project Structure

```
server/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── uploads/
├── cron/
└── server.js
```

---

## 🚀 Installation

Clone repository

```bash
git clone https://github.com/yourusername/yadgar-fashions-backend.git
```

Install packages

```bash
npm install
```

Run development server

```bash
npm run dev
```

Run production server

```bash
npm start
```

---

## ⚙ Environment Variables

Create a `.env` file.

```env
PORT=

MONGO_URI=

JWT_SECRET=

CLIENT_URL=

AWS_ACCESS_KEY_ID=

AWS_SECRET_ACCESS_KEY=

AWS_REGION=

AWS_BUCKET_NAME=

STRIPE_SECRET_KEY=

PAYPAL_CLIENT_ID=

PAYPAL_CLIENT_SECRET=

EMAIL_USER=

EMAIL_PASS=
```

---

## 🔒 Security Features

- JWT Authentication
- Password Encryption
- Helmet Protection
- API Rate Limiting
- Environment Variables
- CORS Protection
- Secure Cookies
- Input Validation

---

## ☁ Cloud Services

- AWS S3 for Image Storage
- Stripe Payment Processing
- PayPal Payment Processing
- SMTP Email Service

---

## 📬 API Modules

- Authentication
- Users
- Products
- Categories
- Orders
- Payments
- Uploads
- Reviews
- Settings
- Dashboard

---

## 📊 Database

MongoDB is used as the primary database with Mongoose ODM.

Collections include:

- Users
- Products
- Categories
- Orders
- Reviews
- Payments

---

## 🚀 Deployment

Recommended platforms:

- Backend: Render
- Database: MongoDB Atlas
- Storage: AWS S3

---

## 🤝 Contributing

Contributions are welcome.

Fork the repository and submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Zabeehullah Yadgar**

Yadgar Fashions

Empowering Afghan fashion through technology.
