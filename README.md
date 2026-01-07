# CDICrud

Website for Casa Del Ingeniero with CRUD functionality

--------------------------------------------------------------------

1. Project Overview

This project is a portfolio web application developed for Casa Del Ingeniero (CDI). Its main purpose is to provide a centralized system to track, manage, and consult equipment entering the company’s technical workshop, while also serving as the company’s public-facing corporate website.

The application combines informational web pages with a core CRUD-based workshop system, supporting both internal employees and external clients through clearly separated access flows.

The project is developed using an agile, sprint-based methodology, with a strong focus on incremental delivery, real-world architecture, responsive frontend design, and clear separation between frontend, backend, and data layers.

--------------------------------------------------------------------

2. Project Objectives

-Build a clean and professional workshop management interface

-Implement a fully functional CRUD system backed by a real database

-Separate concerns between frontend, backend, and data layers

-Provide a public consultation flow for clients

-Develop a complete corporate website for Casa Del Ingeniero

-Serve as a demonstrable portfolio project for development roles

-Apply real-world client–server architecture concepts

--------------------------------------------------------------------

3. Functional Scope

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

Informational Website Pages

Sprint 4 introduced a complete set of corporate informational pages.

Public Pages:

-Inicio (Landing Page)

--Long, scroll-based layout

--Direct anchor navigation to contact section

--Clear presentation of company value proposition

-Nosotros

--Company overview and identity

-Contacto

--Centralized contact information

--Phone, email, and social media references

-Taller

--Entry point to the workshop system (login and consultation)

-Productos

--Static pages listing the company's products

--------------------------------------------------------------------

4. Development Methodology

The project follows an agile methodology inspired by Scrum, adapted for a solo developer environment.

Development is divided into sprints with clearly defined goals, scope, and deliverables.

Sprint Breakdown:

-Sprint 1 – CRUD Frontend Implementation (Completed)

-Sprint 2 – Backend Integration and Database Connectivity (Completed)

-Sprint 3 – Access Flow Control and Public Consultation (Completed)

-Sprint 4 – Corporate Website and Product Catalog Implementation (Completed)

--------------------------------------------------------------------

5. Frontend Implementation

Technologies Used

-HTML5

-CSS3 (Flexbox and CSS Grid)

-JavaScript (Vanilla)

Scope

-Complete frontend architecture for workshop system

-Responsive layout for public-facing pages

-Scroll-based navigation and anchor links

-Dynamic UI behavior using JavaScript where appropriate

Deliverables

-A fully functional and responsive frontend

-Consistent header navigation across all pages

-Visual designs implemented from Canva mockups


6. Backend Implementation (Sprint 2)

Technologies Used

-Node.js

-Express.js

-PostgreSQL

-pg (PostgreSQL client)

-dotenv

-CORS

Backend Architecture

The backend follows a modular architecture with clear separation of responsibilities:

-Database handler (db.js) responsible for managing the PostgreSQL connection pool

-API routes handling all CRUD and consultation logic

-Main server entry point (server.js) responsible for:

--Initializing Express

--Configuring middleware

--Serving frontend static files

--Registering API routes

--Starting the HTTP server

Implemented API Endpoints

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

--------------------------------------------------------------------

7. Access Flow Control and Consultation Logic (Sprint 3)

Sprint 3 introduced controlled access flow and public consultation functionality.

-Logical entry page acts as the system gateway

-Backend-driven validation logic

-Role-based navigation without exposing business logic to the frontend

--------------------------------------------------------------------

8. Product Catalog Implementation (Sprint 4)

Sprint 4 introduced a complete product catalog as part of the corporate website.

Product Pages:

-Productos (Main catalog page)

-Niveles

--Vertical product list layout

--Image, description, and pricing per item

-Estaciones Totales

--Same structured list layout for consistency

-Accesorios

--Single-page catalog with category filters

--Trípodes

--Estadías de aluminio

--Prismas

--Jalón

Technical Decisions:

-All product data is currently hardcoded in HTML

-Images are served as static assets

-CSS Grid is used for responsive product layouts

-JavaScript is used to dynamically show/hide accessory categories

-No backend or database dependency for product catalog in this sprint

9. Project Structure

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
| |
| |--- landingpage.html
| |--- landingpagestyle.css
| |--- nosotrospage.html
| |--- nosotrospagestyle.css
| |--- productospage.html
| |--- productospagestyle.css
| |--- estacionespage.html
| |--- estacionespagestyle.css
| |--- accesoriospage.html
| |--- accesoriospagestyle.css
| |--- accesoriosscript.js
| |--- login.html
| |--- stylelogin.html
| |--- loginscript.html
| |--- consultPage.html
| |--- styleconsult.css
| |--- consultscript.js
| |--- crud.html
| |--- style.css
| |--- app.js
|
|--- README.md

--------------------------------------------------------------------


10. Current Project Status

-Core CRUD system: Completed

-Backend API and database integration: Completed

-Access flow control and consultation page: Completed

-Corporate website pages: Completed

-Product catalog (static implementation): Completed

-Responsive layouts using Flexbox and Grid: Implemented

-JavaScript-based dynamic UI behavior: Implemented

-Authentication and authorization: Planned for future sprint

-Dynamic product catalog via database: Planned for future sprint

-Version control: Maintained through GitHub



