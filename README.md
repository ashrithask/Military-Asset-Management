# Military Asset Management System

A full-stack web application designed to manage military assets, monitor inventory movements, and maintain asset records across different military bases.

## Project Overview

The Military Asset Management System helps manage military equipment and track inventory efficiently. It provides a centralized interface to monitor asset balances, record transactions, and organize equipment information.

## Technologies Used

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3

**Backend**
- Java
- Spring Boot
- Spring Data JPA
- Hibernate

**Database**
- MySQL

**Tools**
- Git
- GitHub
- VS Code
- Eclipse

## Key Features

- Dashboard displaying asset inventory metrics.
- Track opening balance and closing balance.
- Monitor net movement of assets.
- Manage assigned and expended equipment.
- Filter asset records by date, military base, and equipment type.
- Maintain equipment and inventory records.
- Role-based access control.

## Project Structure

```text
MilitaryAssetManagement/
│
├── Military-Asset-Management/    # React frontend
│
├── asset-management/             # Spring Boot backend
│
├── .gitignore
│
└── README.md
```

## Getting Started

### Prerequisites

- Java JDK
- Node.js and npm
- MySQL
- Maven

### Backend Setup

1. Navigate to the `asset-management` folder.
2. Configure your MySQL database connection.
3. Set the required database environment variables.
4. Run the Spring Boot application.

### Frontend Setup

1. Navigate to the `Military-Asset-Management` folder.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Database Configuration

Configure your MySQL database credentials using environment variables. Do not commit passwords or other sensitive credentials to GitHub.

## Author

**Ashritha S K**

GitHub: [ashrithask](https://github.com/ashrithask)