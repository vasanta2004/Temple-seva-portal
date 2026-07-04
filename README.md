# Sri Siddharoodha Swamy Temple Digital Management System

A secure, high-performance, and responsive web application built to digitize, integrate, and streamline administrative and devotee-facing services at the Sri Siddharoodha Swamy Temple in Hubballi, Karnataka.

## 🌟 Overview

The Temple Digital Management System is a unified digital ecosystem designed to serve both devotees and temple administrators. It eliminates the bottlenecks of physical queues and manual ledgers by providing a reactive web platform for remote devotees to access temple services globally.

### ✨ Key Features

* **🙏 Virtual Darshan & Seva Booking**: A comprehensive cart system allowing devotees to book daily, festival, and abhisheka sevas while capturing Gotra, Nakshatra, and Rashi details.
* **🏨 Stay & Lodging Management**: Real-time room booking system with check-in/check-out scheduling to prevent double-booking.
* **💰 Secure Digital Donations**: Custom contribution gateways linked to specific charity accounts (Annadanam, Gau Seva, Vidyadana).
* **🧾 Automated Email Receipts**: Instant confirmation emails with receipt codes and transaction numbers upon successful booking or donation.
* **📊 Administrative Dashboard**: Secure portal for administrators to track devotee records, stay logs, donation distribution, and seva execution.
* **🎥 Media Highlights**: Interactive video reels and an engaging UI showcasing temple festivals.

## 🛠️ Technology Stack

This project utilizes a modern, decoupled 3-tier architecture:

### Frontend (Presentation Layer)
* **Framework**: React 19 (via Vite)
* **Styling**: Tailwind CSS v4
* **Icons & Animation**: Lucide React Icons, Framer Motion
* **Language**: JavaScript (ES6+)

### Backend (Business Logic Layer)
* **Framework**: Spring Boot (Java 17)
* **Security**: Spring Security with JSON Web Tokens (JWT) for Devotee and Admin authentication
* **Email Service**: JavaMail (Asynchronous SMTP messaging)

### Database (Data Layer)
* **Database**: MongoDB (NoSQL)

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (for frontend)
* [Java 17](https://adoptium.net/) (for backend)
* [Maven](https://maven.apache.org/) (for backend)
* [MongoDB](https://www.mongodb.com/) (running locally or a cloud instance)

### Setup Instructions

#### 1. Database Setup
Ensure MongoDB is running on your machine on the default port (`localhost:27017`) or update the `application.properties` in the backend to point to your cluster.

#### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
```
Install dependencies and run the Spring Boot server:
```bash
mvn clean install
mvn spring-boot:run
```
*The backend API will run on `http://localhost:8080`.*

#### 3. Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
```
Install npm packages:
```bash
npm install
```
Start the Vite development server:
```bash
npm run dev
```
*The frontend application will be accessible at `http://localhost:5173`.*

## 🔒 Security
The application uses **Spring Security** combined with **JWT (JSON Web Tokens)** to secure endpoints. Users are categorized into `ROLE_USER` and `ROLE_ADMIN`, ensuring data privacy and restricted access to administrative analytics.

## 📝 Acknowledgements
This system was built as an academic project (2025-2026) at Gogte Institute of Technology, Hubballi, based on the requirements of the Sri Siddharoodha Math and Temple.
