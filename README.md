# Developer Issue Tracking System

A full-stack web application for managing software development issues, tracking their status, and organizing tasks by priority.

Built with **React, Spring Boot, and MySQL**, this project aims to provide a centralized platform for developers to create, view, update, and manage issues through a RESTful API and an interactive web interface.

> **Project status:** Backend CRUD APIs, DTOs, input validation, and exception handling are implemented. Frontend integration and additional interactive features are in progress.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Example API Request](#example-api-request)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## Overview

The Developer Issue Tracking System is designed to simplify issue management during software development.

Users can create issues with descriptions, assign statuses and priorities, retrieve existing issues, update issue details, and delete issues when they are no longer needed.

The backend follows a layered architecture to separate API handling, business logic, database access, and data transfer.

---

## Features

### Implemented

- **Issue Management:** Create, retrieve, update, and delete issues.
- **RESTful API:** HTTP endpoints for issue management.
- **Database Integration:** Persistent storage using MySQL and Spring Data JPA.
- **Request and Response DTOs:** Separate API data structures from database entities.
- **Input Validation:** Validate issue titles and descriptions and require status and priority.
- **Global Exception Handling:** Return structured error responses for validation failures and nonexistent issues.
- **Layered Architecture:** Separate controller, service, repository, entity, DTO, and exception packages.

### Planned

- Interactive React dashboard.
- Issue search, filtering, and sorting.
- Kanban board with status-based columns.
- Dashboard statistics and visualizations.
- User registration, login, and role-based access.
- Responsive design and dark/light theme.
- Automated tests and deployment.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development server and build tooling |
| Java | Backend programming language |
| Spring Boot | Backend application framework |
| Spring Web | REST API development |
| Spring Data JPA | Database access and persistence |
| Hibernate | ORM and entity management |
| MySQL | Relational database |
| Jakarta Bean Validation | Request validation |
| Maven | Backend dependency management |
| Git and GitHub | Version control and source code hosting |

---

## Architecture

The application follows a layered backend architecture.

```text
React Frontend
      |
      | HTTP / JSON
      v
Spring Boot REST Controller
      |
      v
Request DTO + Validation
      |
      v
Service Layer
      |
      v
Spring Data JPA Repository
      |
      v
MySQL Database
```

Responses flow back through the service and controller layers using response DTOs.

### Backend Layers

- **Controller:** Handles HTTP requests and responses.
- **DTO:** Defines the data accepted by and returned from the API.
- **Service:** Contains issue management logic.
- **Repository:** Provides database operations through Spring Data JPA.
- **Entity:** Represents the issue stored in the database.
- **Exception:** Contains custom exceptions and global error handling.

---

## Project Structure

```text
issue-tracker/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── index.html
│
├── backend/
│   └── issue-tracker/
│       ├── pom.xml
│       └── src/
│           └── main/
│               ├── java/
│               │   └── com/rohit/issue_tracker/
│               │       ├── controller/
│               │       ├── dto/
│               │       ├── entity/
│               │       ├── exception/
│               │       ├── repository/
│               │       ├── service/
│               │       └── IssueTrackerApplication.java
│               │
│               └── resources/
│                   └── application.properties
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Install the following:

- Java Development Kit (JDK)
- Maven, or use the Maven wrapper if included
- Node.js and npm
- MySQL Server
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/rohitkumawat-devs/developer-issue-tracker.git
cd developer-issue-tracker
```

### 2. Configure MySQL

Create the database:

```sql
CREATE DATABASE issue_tracker;
```

Configure the database connection in:

`backend/issue-tracker/src/main/resources/application.properties`

Example configuration:

```properties
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/issue_tracker}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
```

Set the `DB_PASSWORD` environment variable to your local MySQL password before starting the backend.

**Security note:** Never commit database passwords, API keys, or other secrets to GitHub.

If your local configuration uses different property names or settings, preserve your working configuration and adapt the example accordingly.

### 3. Start the Backend

Open a terminal:

```bash
cd backend/issue-tracker
```

Run the application using Maven:

```bash
mvn spring-boot:run
```

The backend runs at:

`http://localhost:8080`

Ensure that MySQL is running and the database connection is configured correctly.

### 4. Start the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite typically starts the development server at:

`http://localhost:5173`

The frontend is still being developed and must be connected to the backend before the complete application can be used through the UI.

---

## API Documentation

Base URL:

`http://localhost:8080/api/issues`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/issues` | Create an issue |
| GET | `/api/issues` | Retrieve all issues |
| GET | `/api/issues/{id}` | Retrieve an issue by ID |
| PUT | `/api/issues/{id}` | Update an existing issue |
| DELETE | `/api/issues/{id}` | Delete an issue |

### Validation and Error Handling

The API validates incoming requests and returns `400 Bad Request` for validation failures.

Requests referencing nonexistent issues during retrieval or update return `404 Not Found`.

---

## Example API Request

### Create an Issue

**Request**

```http
POST /api/issues
Content-Type: application/json
```

**JSON body**

```json
{
  "title": "Login button not working",
  "description": "Clicking the login button does nothing.",
  "status": "OPEN",
  "priority": "HIGH"
}
```

A successful response contains the created issue, including its generated ID.

### Example Response

```json
{
  "id": 1,
  "title": "Login button not working",
  "description": "Clicking the login button does nothing.",
  "status": "OPEN",
  "priority": "HIGH"
}
```

The generated ID depends on the database.

---

## Future Enhancements

Planned improvements include:

- Interactive dashboard with issue statistics.
- Kanban board for visual workflow management.
- Search, filtering, sorting, and pagination.
- Authentication and authorization.
- User and project management.
- Issue assignment and comments.
- Automated unit and integration testing.
- Production deployment and CI/CD.

---

## Author

**Rohit Kumawat**

Computer Science and Engineering Student

GitHub: [@rohitkumawat-devs](https://github.com/rohitkumawat-devs)

---

*Developed as a full-stack software engineering project to practice REST API development, database integration, frontend development, validation, and layered application architecture.*