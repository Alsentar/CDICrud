# CDICrud
Website for Casa Del Ingeniero with CRUD functionality

--------------------------------------------------------------------

1. Project Overview

This project is a portfolio web application developed for Casa Del Ingeniero (CDI). Its main purpose is to provide a centralized system to track and manage equipment entering the company’s technical workshop.

The application combines informational web pages with a core CRUD-based workshop system, allowing employees to manage workshop records through a web interface connected to a real backend and database.

The project is developed using an agile, sprint-based methodology, with a strong focus on incremental delivery, real-world architecture, and clear separation between frontend and backend responsibilities.

--------------------------------------------------------------------

2. Project Objectives

-Build a clean and professional workshop management interface

-Implement a fully functional CRUD system backed by a real database

-Separate concerns between frontend, backend, and data layers

-Serve as a demonstrable portfolio project for development roles

-Apply real-world client–server architecture concepts

--------------------------------------------------------------------

3. Functional Scope
Workshop Page (Core Feature)

The Workshop (Taller) page functions as the core of the system and provides a complete CRUD interface for workshop employees.

Employee Access:

-Full CRUD interface

-Capabilities:

--Show/hide equipment input section

--Create new equipment entries

--View all workshop records in a dynamic table

--Update equipment status in real time

--Delete equipment records

-All operations are persisted in a PostgreSQL database

--------------------------------------------------------------------

4. Development Methodology

The project follows an agile methodology inspired by Scrum, adapted for a solo developer environment.

Development is divided into sprints with clearly defined goals, scope, and deliverables.

Sprint Breakdown:

-Sprint 1 – CRUD Frontend (Completed)

-Sprint 2 – CRUD Backend Integration (Completed)

--------------------------------------------------------------------

5. Frontend Implementation (Sprint 1)
5.1 Technologies Used

-HTML5

-CSS3

-JavaScript

5.2 Scope

-HTML structure for the workshop CRUD interface

-CSS styling based on original Canva design

-JavaScript logic for:

--Dynamic table rendering

--Form handling

--UI state toggling (show/hide input section)

5.3 Deliverable

-A fully functional and interactive frontend interface, prepared for backend integration.

--------------------------------------------------------------------

6. Backend Implementation (Sprint 2)
6.1 Technologies Used

-Node.js

-Express.js

-PostgreSQL

-pg (PostgreSQL client)

-dotenv

-CORS

6.2 Backend Architecture

The backend follows a modular architecture with clear separation of responsibilities:

-Database handler (db.js) responsible for managing the PostgreSQL connection pool

-API routes (equipos.js) handling all CRUD operations

-Main server entry point (server.js) responsible for:

--Initializing Express

--Configuring middleware

--Serving frontend static files

--Registering API routes

--Starting the HTTP server

6.3 Implemented API Endpoints

-POST /api/equipos

--Creates a new equipment entry in the database

-GET /api/equipos

--Retrieves all workshop records

-PUT /api/equipos/:id

--Updates the status of an equipment entry

-DELETE /api/equipos/:id

--Deletes an equipment entry

6.4 Frontend–Backend Integration

-The frontend communicates with the backend using the Fetch API

-HTTP methods are used according to REST principles (GET, POST, PUT, DELETE)

-All data displayed in the frontend is dynamically loaded from the database

-The database acts as the single source of truth

--------------------------------------------------------------------

7. Project Structure

/CDICrud
|
|--- /backend
| |
| |--- api
| | |--- equipos.js
| |
| |--- db.js
| |--- server.js
|
|--- /frontend
| |
| |--- /images
| | |
| | |--- logo.png
| |
| |--- app.js
| |--- index.html
| |--- style.css
|
|--- README.md

Folder/file description:

-frontend/: Contains all client-side code

-index.html: Main workshop interface

-style.css: Visual styling

-app.js: Frontend logic, event handling, and API communication

-images/: Static assets (company logo)

-backend/: Server-side application

-server.js: Express server entry point

-db.js: PostgreSQL connection handler

-api/equipos.js: REST API routes for workshop CRUD operations

-README.md: Technical documentation and project overview

--------------------------------------------------------------------

8. Current Project Status

-Frontend CRUD interface: Completed

-Backend API and database integration: Completed

-Full CRUD functionality: Implemented and tested

-Deployment: Not implemented (planned for a future phase)

-Version control: Maintained through GitHub