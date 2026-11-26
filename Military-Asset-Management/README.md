# Military Asset Management System

A web-based Military Asset Management System developed to manage military equipment, purchases, transfers, assignments, expenditures, and role-based access.

## 1. Project Overview

The Military Asset Management System provides a centralized platform for managing military assets across different bases.

The system allows authorized users to:

* View asset dashboard metrics
* Record equipment purchases
* Transfer equipment between bases
* Assign equipment to personnel
* Record expended equipment
* View transaction history
* Access features based on user role

## 2. Key Features

### Dashboard

The dashboard displays:

* Opening Balance
* Purchases
* Transfer In
* Transfer Out
* Net Movement
* Assigned Assets
* Expended Assets
* Closing Balance

The dashboard also supports filtering by:

* Date
* Base
* Equipment Type

### Purchases

Users with purchase access can:

* Add new equipment purchases
* Specify equipment name and type
* Specify quantity and base
* Record purchase date
* View purchase history

### Transfers

Users with transfer access can:

* Transfer equipment from one base to another
* Specify source and destination bases
* Specify quantity
* Record transfer date
* View transfer history

### Assignments

Authorized users can:

* Assign equipment to personnel
* Specify personnel name
* Specify equipment and quantity
* Record assignment date

### Expenditures

Authorized users can:

* Record expended equipment
* Specify equipment and quantity
* Record expenditure date
* View expenditure records

## 3. Role-Based Access Control

The application provides role-based access at the frontend level for the demonstration.

### Admin

Access to:

* Dashboard
* Purchases
* Transfers
* Assignments
* Expenditures

### Base Commander

Access to:

* Dashboard
* Assignments
* Expenditures

The demonstration Base Commander is associated with the Bangalore base.

### Logistics Officer

Access to:

* Dashboard
* Purchases
* Transfers

## 4. Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Spring Security
* REST APIs
* Maven

### Database

* MySQL

## 5. Architecture

The application follows a three-layer architecture:

```text
React Frontend
      |
      | REST API
      |
Spring Boot Backend
      |
      | JPA / Hibernate
      |
MySQL Database
```

The React frontend communicates with the Spring Boot backend through REST APIs. The backend manages business operations and communicates with MySQL using Spring Data JPA.

## 6. Database Design

The main entities used by the system are:

* Users
* Bases
* Equipment
* Purchases
* Transfers
* Assignments
* Expenditures
* Audit Logs

Important relationships include:

* Equipment belongs to a base.
* Purchases are associated with equipment and a base.
* Transfers contain source and destination bases.
* Assignments contain assigned equipment and personnel information.
* Expenditures contain equipment and expenditure information.
* Users have roles and can be associated with a base.

## 7. Dashboard Calculations

### Net Movement

```text
Net Movement = Purchases + Transfer In - Transfer Out
```

### Closing Balance

```text
Closing Balance =
Opening Balance + Net Movement - Assigned - Expended
```

## 8. API Endpoints

### Purchases

```text
GET  /api/purchases
POST /api/purchases
```

### Transfers

```text
GET  /api/transfers
POST /api/transfers
```

### Assignments

```text
GET  /api/assignments
POST /api/assignments
```

### Expenditures

```text
GET  /api/expenditures
POST /api/expenditures
```

## 9. Local Setup

### Prerequisites

Install:

* Java
* Node.js
* MySQL
* Git

### Database

Create the database:

```sql
CREATE DATABASE military_asset_management;
```

Import the provided database dump:

```text
military_asset_management.sql
```

### Backend

Open the backend project:

```text
asset-management
```

Configure the MySQL username and password in:

```text
src/main/resources/application.properties
```

Run the backend:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### Frontend

Open the frontend project:

```text
Military-Asset-Management
```

Install dependencies:

```powershell
npm install
```

Run the application:

```powershell
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## 10. Demo Login

The current demonstration login allows a user to select a role.

Available roles:

```text
Admin
Base Commander
Logistics Officer
```

For demonstration purposes, the login is implemented on the frontend and does not represent production-grade authentication.

## 11. Assumptions

* Bases are represented using base names.
* Equipment records are managed using equipment name, type, quantity, and base information.
* The current demonstration uses simplified role selection.
* The system is designed as a prototype/take-home assignment.

## 12. Limitations

* Production-grade JWT authentication has not been fully implemented.
* Backend-level RBAC enforcement can be enhanced for production use.
* Audit logging can be extended to capture detailed backend transaction information.
* Additional validation and security hardening would be required before production deployment.

## 13. Future Enhancements

Possible future improvements include:

* JWT-based authentication
* Backend-enforced RBAC
* Detailed audit logging
* Advanced dashboard charts
* Pagination and sorting
* Advanced search
* User management
* Base management
* Cloud deployment
* Automated testing

## 14. Project Structure

```text
MilitaryAssetManagement/
│
├── Military-Asset-Management/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
└── asset-management/
    ├── src/
    ├── pom.xml
    └── application.properties
```

## 15. Database Dump

A MySQL database dump is included with the submission:

```text
military_asset_management.sql
```

This file can be used to recreate the database and sample transaction data.

---

## Author

Military Asset Management System
Developed as a take-home assignment.
