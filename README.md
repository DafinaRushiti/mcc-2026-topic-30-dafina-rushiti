# Restaurant Management System

Cloud Computing and MCC 2026 assignment project for topic 30: Cloud Database Migration Playground.

This project is a restaurant management system with a React frontend and a Node.js/Express backend. It manages users, products, orders, coupons, daily reports, and manager analytics using a MySQL database with Sequelize.

## Stack

- Frontend: React, Vite, Material UI, Axios, Recharts
- Backend: Node.js, Express, Sequelize, MySQL
- Authentication: JWT and bcrypt
- Database: MySQL
- Cloud deployment: Vercel, Render, Aiven MySQL

## Live Deployment

- Project repository: https://github.com/DafinaRushiti/mcc-2026-topic-30-dafina-rushiti
- Frontend: https://mcc-2026-topic-30-dafina-rushiti.vercel.app
- Backend API: https://mcc-2026-topic-30-dafina-rushiti.onrender.com
- Database: Aiven for MySQL

Frontend requests are sent to the backend API through:

```text
VITE_API_URL=https://mcc-2026-topic-30-dafina-rushiti.onrender.com/api
```

## Project Structure

```text
restaurant-main/        Frontend React app
restoranti-back-main/   Backend Express API
```

## Environment Setup

Copy the example environment files before running the project:

```bash
cp restaurant-main/.env.example restaurant-main/.env
cp restoranti-back-main/.env.example restoranti-back-main/.env
```

On Windows PowerShell:

```powershell
Copy-Item restaurant-main/.env.example restaurant-main/.env
Copy-Item restoranti-back-main/.env.example restoranti-back-main/.env
```

Update the backend `.env` values to match your local or cloud MySQL database.

## Run Backend

```bash
cd restoranti-back-main
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

API routes are available under:

```text
http://localhost:5000/api
```

## Run Frontend

Open a second terminal:

```bash
cd restaurant-main
npm install
npm run dev
```

The frontend runs on the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Default Admin User

If no admin user exists, the backend creates one during database initialization:

```text
Email: admin@restaurant.com
Password: admin123
```

Change this before using the project in production.

## Database Notes

The backend connects to MySQL through Sequelize. The assignment focus is cloud database migration, so the database work includes:

- schema setup for users, products, orders, order details, coupons, and daily reports
- managed Aiven MySQL cloud database connection
- SSL support for cloud MySQL
- default admin seed data
- migration checks
- rollback documentation
- local and cloud database configuration

See [Database Migration Guide](docs/database-migration.md) for the topic-specific migration plan and checks.

The backend was tested successfully with Aiven MySQL. On first connection, Sequelize created the required tables and the app created a default admin user.

## Testing

Deployment and local testing notes are documented in [Testing Guide](docs/testing.md).

## Security Notes

- Do not commit real `.env` files.
- Use `.env.example` for variable names and safe placeholder values.
- Use a strong `JWT_SECRET` in real deployments.
