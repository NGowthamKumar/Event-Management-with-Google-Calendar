# Google Calendar Event Management (MVC)

A **Node.js MVC-based application** integrated with **Google Calendar API** to manage calendar events efficiently.  
Supports **creating, updating, and deleting events**, along with **automated email notifications** using **Nodemailer** and **Liquid templates**.  
Includes **user authentication**, Google event synchronization, and structured **Winston logging** for better debugging and maintenance.

---

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Project Structure](#project-structure)  
- [Installation](#installation)  
- [API Endpoints](#api-endpoints)  
- [Testing](#testing)  
- [Technologies Used](#technologies-used)  
- [Notes](#notes)

---

## Overview

This project follows the **Model–View–Controller (MVC)** architecture and integrates with the **Google Calendar API** to automate event management.  
It provides RESTful endpoints for user and event operations with testing support using **Mocha** and **Chai**.  

The system:
- Manages event lifecycle — *Create, Read, Update, Delete (CRUD)*  
- Syncs events with Google Calendar in real time  
- Sends customized event notification emails to participants  
- Uses structured logging for better monitoring  

---

## Features

### Google Calendar Integration
- OAuth2 authorization and access token handling  
- Real-time event synchronization (Create, Update, Delete)  
- Supports multiple attendees per event  

### Email Notifications
- Sends automated HTML emails to event attendees  
- Email templates designed using **LiquidJS**  
- Uses **Nodemailer** with Gmail SMTP service  

### User Management
- User registration and login APIs  
- Passwords hashed using **MD5** for authentication  

### Testing
- Unit and integration tests written using **Mocha** and **Chai**  
- Covers all major event endpoints (Create, Read, Update, Delete, List)  

### Additional Features
- Modular MVC architecture  
- Centralized logging with **Winston**  
- Error handling middleware for cleaner responses  

---

## Project Structure

```

mvc/
│
├─ src/
│ ├─ config/ # Configurations (logger, middleware, router)
│ ├─ constants/ # Static constants and credentials
│ ├─ controllers/ # Request handlers
│ │ ├─ events/ # Event operations
│ │ │ ├─ events.js
│ │ │ └─ index.js
│ │ └─ users/ # User operations
│ │ ├─ users.js
│ │ └─ index.js
│ ├─ helpers/ # Utility and helper functions
│ │ └─ eventFormat.js
│ ├─ model/ # MongoDB data models
│ │ ├─ eventModel.js
│ │ └─ userModel.js
│ ├─ schema/ # Mongoose schemas
│ ├─ services/ # External integrations
│ │ ├─ googleCalendar.service.js
│ │ ├─ mail.js
│ │ └─ emailTemplate.liquid
│ └─ index.js # App entry point
│
├─ test/ # Mocha and Chai test cases
│ ├─ createEvent.js
│ ├─ deleteEvents.js
│ ├─ events.js
│ ├─ getEvent.js
│ └─ updateEvent.js
│
├─ .eslintrc.json # Linter configuration
├─ package.json # Project dependencies
├─ babel.config.js # Babel transpilation config
└─ gulpfile.js # Task automation setup

```
---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NGowthamKumar/mvc.git
   cd mvc
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:

   ```env
   MAIL_ID=youremail@gmail.com
   MAIL_PASSWORD=yourpassword
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REDIRECT_URI=your_redirect_uri
   ```

4. Start MongoDB (if running locally):

   ```bash
   mongod
   ```

5. Run the application:

   ```bash
   npm start
   ```

Default server port: `8000`.

---

## API Endpoints

### **User Routes**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/login` | User login |
| POST | `/register` | User registration |

### **Event Routes**
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/authorization` | Google OAuth authorization |
| POST | `/createEvent` | Create new calendar event |
| PUT | `/updateEvent` | Update an existing event |
| GET | `/readEvent/:_id` | Get event details by ID |
| GET | `/events` | List all events with pagination |
| DELETE | `/deleteEvent/:_id` | Delete event by ID |
| GET | `/authSuccess` | Google OAuth success callback |

---

## Testing

Run unit and integration tests using **Mocha** and **Chai**.

1. Install Mocha globally (if not already):
   ```bash
   npm install -g mocha
   ```

2. Run all test cases:
   ```bash
   npm test
   ```

The test suite validates:
- Event creation, update, and deletion APIs  
- Event retrieval with pagination  
- Input validation and error handling  

---

## Technologies Used

- **Node.js**  
- **Express.js**  
- **MongoDB & Mongoose**  
- **Google Calendar API**  
- **Nodemailer + LiquidJS**  
- **Mocha & Chai** (Testing)  
- **Winston Logger**  
- **Babel & Gulp** for task automation  

---

## Notes

- Ensure **Google API credentials** are properly configured before running authorization.  
- Use `.env` for sensitive data like credentials and passwords.  
- Replace **MD5 hashing** with **bcrypt** in production for better security.  
- Check your **Google Cloud Console** for valid redirect URIs before OAuth authorization.  
- Logging, testing, and mail configurations can be customized as needed.  

---

