# CDICrud
Website for Casa Del Ingeniero with CRUD functionality

--------------------------------------------------------------------

1. Project Overview

This project is a portfolio web application developed for Casa Del Ingeniero (CDI). Its main purpose is to provide a centralized system to track, manage, and consult equipment entering the company’s technical workshop.

The application combines informational web pages with a core CRUD-based workshop system, supporting both internal employees and external clients through clearly separated access flows.

The project is developed using an agile, sprint-based methodology, with a strong focus on incremental delivery, real-world architecture, and clear separation between frontend, backend, and data layers.

--------------------------------------------------------------------

2. Project Objectives

-Build a clean and professional workshop management interface

-Implement a fully functional CRUD system backed by a real database

-Separate concerns between frontend, backend, and data layers

-Provide a public consultation flow for clients

-Serve as a demonstrable portfolio project for development roles

-Apply real-world client–server architecture concepts

--------------------------------------------------------------------

3. Functional Scope
Workshop Page (Core Feature)

The Workshop (Taller) page functions as the administrative core of the system and provides a complete CRUD interface for workshop employees.

Employee Capabilities:

-Full CRUD interface

--Create new equipment entries

--View all workshop records in a dynamic table

--Update equipment status in real time

--Delete equipment records

--All operations are persisted in a PostgreSQL database

Client Consultation Page

-The system provides a public consultation page that allows clients to check the status of their equipment using a unique entry number.

Client Capabilities:

-Consult equipment status by entry number

-View equipment details including:

--Entry number

--Equipment type

--Brand

--Model

--Serial number

--Current status

-Read-only access with no authentication required

--------------------------------------------------------------------

4. Development Methodology

The project follows an agile methodology inspired by Scrum, adapted for a solo developer environment.

Development is divided into sprints with clearly defined goals, scope, and deliverables.

Sprint Breakdown:

-Sprint 1 – CRUD Frontend Implementation (Completed)

-Sprint 2 – Backend Integration and Database Connectivity (Completed)

-Sprint 3 – Access Flow Control and Public Consultation (Completed)

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

-GET /api/equipos/:entradaid

--Retrieves a single equipment record by entry number

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

7. Access Flow Control and Consultation Logic (Sprint 3)

Sprint 3 introduced controlled access flow and public consultation functionality.

7.1 Entry Page (Logical Login)

-A single entry page acts as the system gateway

-Users provide an entry number or employee access code

-The frontend delegates all validation to the backend

7.2 Backend Verification Logic

-A dedicated verification endpoint determines the request type

-The backend decides whether the input corresponds to:

--An employee access

--A valid workshop entry

--An invalid request

-Frontend behavior is driven exclusively by backend responses

7.3 Role-Based Navigation

-Employees are redirected to the administrative CRUD interface

-Clients are redirected to the public consultation page

-No business logic is implemented on the client side

7.4 Public Consultation Integration

-The consultation page retrieves real-time data using a RESTful GET endpoint

-Data updates are immediately reflected across multiple open sessions

-The CRUD and consultation views share the same backend and database

--------------------------------------------------------------------

8. Project Structure

/CDICrud
|
|--- /backend
| |
| |--- api
| | |--- equipos.js
| | |--- consultar.js
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
| |--- login.html
| |--- consultPage.html
| |--- crud.html
| |--- style.css
| |--- styleConsult.css
| |--- loginscript.js
| |--- consultscript.js
|
|--- README.md

Folder/file description:

-frontend/: Contains all client-side code

-login.html: System entry page

-consultPage.html: Public equipment consultation page

-crud.html: Administrative workshop interface

-style.css / styleConsult.css: Visual styling

-loginscript.js: Entry flow logic

-consultscript.js: Consultation data fetching and rendering logic

-backend/: Server-side application

-server.js: Express server entry point

-db.js: PostgreSQL connection handler

-api/equipos.js: REST API routes for workshop CRUD operations

-api/consultar.js: Backend verification and access routing logic

-README.md: Technical documentation and project overview

--------------------------------------------------------------------

9. Current Project Status

-Core CRUD system: Completed

-Backend API and database integration: Completed

-Access flow control and consultation page: Completed

-Cloud database migration (Supabase): Completed

-Real-time data consistency across views: Verified

-Visual refinement and responsive design: Pending

-Authentication and authorization: Planned for Sprint 4

-Version control: Maintained through GitHub