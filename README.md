# CDICrud

Website for Casa Del Ingeniero with CRUD functionality

--------------------------------------------------------------------

Project Overview

This project is a portfolio web application developed for Casa Del Ingeniero (CDI). Its main purpose is threefold:

- To provide a centralized system to track, manage, consult, and document equipment entering the company’s technical workshop

- To provide automatic pricing for topographical surveys, while also notifying the survey team of incoming jobs.

- To serve as the company’s public-facing corporate website.

The application combines informational web pages with a CRUD-based workshop management system, supporting both internal employees and external clients through separated access flows.

As of Sprints 5 and 6, the system has evolved from a basic CRUD application into a functional platform, incorporating document generation, cloud storage, and file uploads. 

The project is developed using an agile, sprint-based methodology, with a strong focus on incremental delivery, real-world client–server architecture, clean separation of concerns, and production readiness.

Project Objectives

- Develop a complete corporate website for Casa Del Ingeniero

- Build a clean and professional workshop management interface

- Implement a fully functional CRUD system backed by a real PostgreSQL database

- Provide a public consultation flow for clients

- Enable document generation and document management for workshop operations

- Design a production-ready architecture suitable for real deployment

- Serve as a demonstrable portfolio project for backend and full-stack development roles

--------------------------------------------------------------------

Functional Scope

The Workshop (Taller) page functions as the administrative core of the system and provides a complete CRUD interface for workshop employees.

Employee Capabilities:

- Full CRUD interface

- - Create new equipment entries

- - View all workshop records in a dynamically generated table

- - Automatic ordering of entries by entry number (descending)

- - Update equipment status in real time

- - Delete equipment records

- - All operations persisted in a PostgreSQL database

- Extended data capture during equipment intake

- - Client information (name, company, RNC, phone, email)

- - Accessories field (free-form text for variable accessory lists)

- Automatic document generation

- - Generate a Word document using the official company intake template

- - Document is generated automatically upon equipment registration

- - Document is populated using data from multiple related database tables

- Certificate management (Sprint 6)

- - Upload calibration certificates (Word or PDF)

- - Certificates stored securely in cloud storage

- - Certificates associated to equipment entries via entry number

- - Backend-controlled download using signed URLs

--------------------------------------------------------------------

Client Consultation Page

The system provides a public consultation page that allows clients to check the status of their equipment and download associated documents.

Client Capabilities:

- Consult equipment status by entry number

- View equipment details including:

- - Entry number

- - Equipment type

- - Brand

- - Model

- - Serial number

- - Current status

- Download calibration certificates (when available)

- Read-only access with no authentication required

--------------------------------------------------------------------

Automated Quotation System 

The platform includes an automated pricing system designed to handle pre-service customer inquiries.

Quotation Capabilities:

- Public quotation form with dynamic fields based on service type

- Supported service categories include:

- - Topographic surveying services

- Automatic price calculation handled by backend logic

- Quotation data persisted in the database for administrative review

- Administrative interface to review submitted quotations

- Separation between quotation data and workshop intake data

- Automatic notifications to survey team emails


--------------------------------------------------------------------


Informational Website Pages

The application includes a complete corporate website for Casa Del Ingeniero.

Public Pages:

- Inicio (Landing Page)

- - Long, scroll-based layout

- - Anchor navigation to contact section

- - Clear presentation of company value proposition

- Nosotros

- - Company overview and identity

- Contacto

- - Centralized contact information

- - Phone, email, and social media references

- Taller

- - Entry point to the workshop system (login and consultation)

- Productos

- - Static product catalog pages

--------------------------------------------------------------------

Development Methodology

The project follows an agile methodology inspired by Scrum, adapted for a solo developer environment.

Development is divided into sprints with clearly defined goals, scope, and deliverables, focusing on real-world applicability rather than academic abstraction.

Sprint Breakdown:

- Sprint 1 – CRUD Frontend Implementation (Completed)

- Sprint 2 – Backend Integration and Database Connectivity (Completed)

- Sprint 3 – Access Flow Control and Public Consultation (Completed)

- Sprint 4 – Corporate Website and Product Catalog Implementation (Completed)

- Sprint 5 – Automatic Pricing Fronend & Backend Implementation (Completed)

- Sprint 6 – Document Generation, File Storage, and Deployment Planning (Completed)

--------------------------------------------------------------------

Frontend Implementation

Technologies Used:

- HTML5

- CSS3 (Flexbox and CSS Grid)

- JavaScript (Vanilla)

Scope:

- Complete frontend architecture for workshop system

- Dynamic table rendering based on backend API responses

- Automatic ordering of records based on business logic

- Extended intake forms for client and accessory data

- File upload interface for calibration certificates

- Secure document download triggers via backend endpoints

- Responsive layouts for public-facing pages

Deliverables:

- A fully functional and responsive frontend

- Consistent navigation across all pages

- UI aligned with operational needs of reception and technical staff

- Forms designed for real-world workshop workflows

--------------------------------------------------------------------

Backend Implementation (Sprints 2, 5, and 6)

Technologies Used

- Node.js

- Express.js

- PostgreSQL

- pg (PostgreSQL client)

- dotenv

- CORS

- multer (file uploads)

- docxtemplater and related libraries (document generation)

- Supabase (managed PostgreSQL and Storage)

- Nodemailer

--------------------------------------------------------------------

Backend Architecture

The backend follows a modular architecture with clear separation of responsibilities:

- Database handler (db.js) managing PostgreSQL connection pooling

- API route modules encapsulating domain logic

- Document generation service layer

- Cloud storage integration layer

- Main server entry point (server.js) responsible for:

- - Initializing Express

- - Configuring middleware

- - Serving frontend static files

- - Registering API routes

- - Starting the HTTP server

--------------------------------------------------------------------

Implemented API Endpoints

Equipment Management

- POST /api/equipos

- - Creates a new equipment entry

- - Creates associated client records

- - Links entries and clients through relational tables

- - Triggers automatic Word document generation

- GET /api/equipos

- - Retrieves all workshop records

- - Returns data ordered by entry number (descending)

- GET /api/equipos/:entradaid

- - Retrieves a single equipment record by entry number

- PUT /api/equipos/:id

- - Updates the status of an equipment entry

- DELETE /api/equipos/:id

- - Deletes equipment entries and associated relational links

Certificate Management (Sprint 6):

- POST /api/equipos/:id/certificado

- - Uploads calibration certificate files

- - Stores files in cloud storage

- - Persists metadata in database

- GET /api/equipos/:id/certificado

- - Generates a time-limited signed URL

- - Forces secure file download without exposing storage credentials

Access Flow Control and Consultation Logic (Sprint 3)

- Controlled logical entry point for the system

- Backend-driven validation logic

- Separation between employee-facing CRUD and client-facing consultation

- No business logic exposed to the frontend

--------------------------------------------------------------------

Product Catalog Implementation (Sprint 4)

Product Pages:

- Productos (Main catalog page)

- Niveles

- Estaciones Totales

- Accesorios

- - Category-based dynamic filtering

Technical Decisions:

- All product data is currently static

- Images served as static assets

- CSS Grid used for responsive layouts

- JavaScript used for dynamic category toggling

- No backend dependency in this sprint

--------------------------------------------------------------------

Project Structure

/CDICrud
|
|--- /backend
| |
| |--- /api
| | |--- equipos.js
| | |--- consultar.js
| | |--- cotizar.js
| |
| |--- /services
| | |--- wordGenerator.js
| | |--- email.js
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
| |--- Pricerpage.html
| |--- Pricerpagestyle.css
| |--- pricerpagescript.js
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

Current Project Status

- Core CRUD system: Completed

- Extended intake data model (client + accessories): Implemented

- Automatic Word document generation: Implemented

- Calibration certificate upload and download: Implemented

- Cloud-based storage integration: Implemented

- Backend transactional integrity: Implemented

- Production deployment planning: Completed

- Authentication and authorization: Planned for future sprint

- Dynamic product catalog via database: Planned for future sprint

- Version control and iterative development: Actively maintained



