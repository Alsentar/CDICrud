# CDICrud
Website for Casa Del Ingeniero with CRUD functionality

--------------------------------------------------------------------

1. Project Overview

This project is a portfolio web application developed for Casa Del Ingeniero (CDI). Its main purpose is to provide a centralized system to track and manage equipment entering the company’s technical workshop.

The application combines informational web pages with a core CRUD-based workshop system, allowing both clients and employees to interact with workshop data according to their role.

The project is being developed using an agile, sprint-based methodology, with a strong focus on incremental delivery and clear separation between frontend and backend responsibilities.

--------------------------------------------------------------------

2. Project Objectives

-Build a clean and professional workshop management interface

-Implement a CRUD system for tracking equipment in repair

-Separate concerns between frontend and backend

-Serve as a demonstrable portfolio project for web development roles

--------------------------------------------------------------------

3. Functional Scope

3.1 Workshop Page (Core Feature)

The Workshop (Taller) page functions as the core of the system and provides role-based access


Employee Access:

-Full CRUD interface

-Capabilities:

--Show/hide input section

--------------------------------------------------------------------

4. Development Methodology

The project follows an agile methodology inspired by Scrum, adapted for a solo developer environment.

Development is divided into sprints with clearly defined goals and deliverables.

Sprint Breakdown:
-Sprint 1 – CRUD Frontend (Completed)

Objective:
-Build the complete visual and interactive frontend of the workshop CRUD system.

Scope:

-HTML structure for the CRUD interface

-CSS styling based on original Canva design

-JavaScript logic for:

--Dynamic table toggling


Deliverable:
A fully functional frontend interface.

--------------------------------------------------------------------

5. Frontend Implementation (Sprint 1)

5.1 Technologies Used

-HTML5

-CSS3

-JavaScript

No backend or database is used during this sprint; all data is handled in memory using JavaScript.

6. Project Structure
/CDICrud
|
|--- /backend
|
|--- /frontend
|     |
|     |--- /images
|     |     |
|     |     |--- logo.png
|     |
|     |--- app.js
|     |--- index.html
|     |--- style.css
|
|--- README.md

Folder/file description:

-frontend/:Contains all client-side code

-index.html: Main workshop interface

-style.css: Visual styling

-app.js: Frontend logic and interactivity

-images/: Static assets (company logo)

-backend/: Reserved for Sprint 2. Will contain server logic, API routes, and database configuration

-README.md: Technical documentation and project overview

--------------------------------------------------------------------

7. Backend Roadmap (Next Sprint)

Sprint 2 – Backend Development (Planned)

Objectives:

-Implement a Node.js + Express backend

-Design and connect a relational database

-Create REST API endpoints for:

--Create equipment entries

--Read workshop records

--Update equipment status

-Connect frontend to backend via HTTP requests

--------------------------------------------------------------------

8. Current Project Status

-Frontend CRUD interface: Completed

-Backend: Not implemented (next sprint)

-Deployment: Not planned at this stage

-Version control: Intended for GitHub documentation and tracking

