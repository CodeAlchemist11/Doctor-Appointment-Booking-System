# 🏥 MediCare - Doctor Appointment Booking System

> A full-stack **Doctor Appointment Booking System** that enables patients to book appointments with doctors, allows doctors to manage appointments and availability, and provides administrators with complete control over doctors, patients, and appointments.

---

# ✨ Features

## 👤 Patient Module

- ✅ User Registration & Login
- 🔐 JWT Authentication
- 👨‍⚕️ View Doctor List
- 🔍 Search Doctors by Specialization
- 📄 View Doctor Details
- 📅 Book Appointment
- 📝 View My Appointments
- ❌ Cancel Appointment
- 🔔 View Notifications
- 👤 View Personal Profile

---

## 👨‍⚕️ Doctor Module

- 🔐 Secure Login
- 📊 Dashboard with Statistics
- 🟢 Manage Availability
- 🕒 Manage Available Time Slots
- 👥 View Patient Appointments
- 🔄 Update Appointment Status
- 🔔 Receive Notifications
- 👤 View Profile

---

## 👨‍💼 Admin Module

- 🔐 Secure Login
- 📈 Dashboard Analytics
- ➕ Add New Doctor
- ✏️ Edit Doctor Details
- 🗑️ Delete Doctor
- 👥 Manage Patients
- ❌ Delete Patients
- 📅 View All Appointments
- 🔍 Search Doctors
- 🔎 Search Patients

---

# 🚀 Tech Stack

## 🎨 Frontend

- ⚛️ React.js
- ⚡ Vite
- 🧭 React Router DOM
- 🎨 Tailwind CSS
- 🌐 Context API
- 📡 Fetch API
- 🎯 React Icons
- ✨ Lucide React

---

## ⚙️ Backend

- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB
- 📦 Mongoose
- 🔐 JWT Authentication
- 🔒 bcryptjs
- 📤 Multer
- ☁️ Cloudinary
- ⚙️ dotenv
- 🌍 CORS

---

# 📁 Project Structure

```text
doctor-appointment/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication & Authorization

### 🔑 Authentication

- JWT Token Authentication

### 👥 Roles

- 👤 Patient
- 👨‍⚕️ Doctor
- 👨‍💼 Admin

✅ Protected Routes are implemented for every role.

---

# 📦 Installation

## 📥 Clone Repository

```bash
git clone 
cd doctor-appointment
```

---

# ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run Backend

```bash
npm run dev
```

---

# 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🌐 Default URLs

### 🖥️ Frontend

```
http://localhost:5173
```

### ⚙️ Backend

```
http://localhost:5000
```

---

# 📡 API Modules

### 🔐 Authentication

- Register
- Login
- Profile

### 👨‍⚕️ Doctor

- Dashboard
- Doctor Details
- Doctor Availability
- Manage Slots
- Doctor Appointments

### 📅 Appointment

- Book Appointment
- My Appointments
- Cancel Appointment
- Update Status

### 👨‍💼 Admin

- Dashboard
- Manage Doctors
- Manage Patients
- Manage Appointments

### 🔔 Notification

- Get Notifications
- Mark Notification as Read

---

# 👥 User Roles

| Role        | Permissions                                        |
|-------------|----------------------------------------------------|
| 👤 Patient | Book Appointment, View Doctors, Cancel Appointment |
| 👨‍⚕️ Doctor  | Manage Slots, Availability, Appointments           |
| 👨‍💼 Admin   | Full System Management                             |

---

# 🗄️ Database Collections

- 👤 Users
- 👨‍⚕️ Doctors
- 📅 Appointments
- 🔔 Notifications
- 🕒 Available Slots

---

# ⭐ Main Functionalities

- ✅ JWT Authentication
- ✅ Role-Based Authorization
- ✅ Doctor Search
- ✅ Doctor Profile Management
- ✅ Appointment Booking
- ✅ Appointment Cancellation
- ✅ Appointment Status Update
- ✅ Doctor Availability Management
- ✅ Slot Management
- ✅ Dashboard Analytics
- ✅ Notification System
- ✅ Responsive UI

---

# 🔮 Future Enhancements

- 💳 Online Payment Integration
- 🎥 Video Consultation
- 📧 Email Notifications
- 📱 SMS Notifications
- 🩺 Patient Medical Records
- 📄 Prescription Upload
- ⭐ Doctor Ratings & Reviews
- 🔑 Forgot Password
- 📲 OTP Verification
- 🌙 Dark Mode
- 📅 Google Calendar Integration

---

# 🖼️ Application Modules

## 👤 Patient

- 🏠 Home
- 👨‍⚕️ Doctors
- 📄 Doctor Details
- 📅 Book Appointment
- 📝 My Appointments
- 🔔 Notifications
- 👤 Profile

## 👨‍⚕️ Doctor

- 📊 Dashboard
- 🕒 Manage Slots
- 📅 Appointments
- 🔔 Notifications
- 👤 Profile

## 👨‍💼 Admin

- 📈 Dashboard
- 👨‍⚕️ Manage Doctors
- ➕ Add Doctor
- ✏️ Edit Doctor
- 👥 Manage Patients
- 📅 Manage Appointments

---

# 👨‍💻 Developed By

**Ipsita Behera**

🎓 B.Tech Student

🏫 Institute of Technical Education and Research (ITER), SOA University

---

# 📄 License

📚 This project is developed for educational and learning purposes.

⭐ If you like this project, don't forget to **Star ⭐ the repository**.