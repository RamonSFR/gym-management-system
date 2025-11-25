# GYM Management API

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

A RESTful API for managing gym members and employees, built with Node.js, Express, TypeScript, Prisma, and Postgres.
Includes Swagger UI documentation.

## API Documentation

Interactive Swagger documentation is available at: **`http://localhost:3000/api-docs`**

## Quick Start

1. Install dependencies: `npm install`
2. Set up your `.env` file with `DATABASE_URL`
3. Run migrations: `npx prisma migrate dev`
4. Start the server: `npm run dev`
5. Visit `http://localhost:3000/api-docs` for interactive API documentation

## Endpoints

### Employees

- `GET /employees` - Get all employees with workouts
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Members

- `GET /members` - Get all members with workouts
- `GET /members/:id` - Get member by ID
- `POST /members` - Create new member (membership: silver/platinum/gold)
- `PUT /members/:id` - Update member
- `DELETE /members/:id` - Delete member

### Workouts

- `GET /workouts` - Get all workouts with employee and member details
- `GET /workouts/:id` - Get workout by ID
- `POST /workouts` - Create new workout with exercises
- `PUT /workouts/:id` - Update workout
- `DELETE /workouts/:id` - Delete workout

## Features

- **Full CRUD operations** for employees, members, and workouts
- **Data validation** with custom error messages
- **Relationship management** between employees, members, and workouts
- **JSON-based exercise storage** with validation
- **Automatic timestamps** and ID generation
- **Interactive Swagger UI** documentation

---
