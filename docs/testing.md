# Testing Guide

This document records the local and cloud testing completed for the Restaurant Management System.

## Local Testing

Backend local run:

```bash
cd restoranti-back-main
npm run dev
```

Successful backend checks:

- Express server started on port `5000`.
- MySQL connection succeeded.
- Sequelize synchronized the database models.
- Admin user check completed.

Frontend local run:

```bash
cd restaurant-main
npm run dev
```

Successful frontend checks:

- Vite development server started.
- Admin login opened the manager dashboard.
- Manager dashboard loaded menu/product data.
- Inventory, online orders, reports, and analytics pages were available from navigation.

## Cloud Testing

Cloud services:

| Layer | Service |
| --- | --- |
| Frontend | Vercel |
| Backend | Render |
| Database | Aiven MySQL |

Deployment URLs:

```text
Frontend: https://mcc-2026-topic-30-dafina-rushiti.vercel.app
Backend:  https://mcc-2026-topic-30-dafina-rushiti.onrender.com
```

Successful cloud checks:

- Render backend deployed from the `restoranti-back-main` folder.
- Render backend connected to Aiven MySQL using SSL.
- Aiven database tables were created by Sequelize.
- Vercel frontend deployed from the `restaurant-main` folder.
- Vercel frontend used `VITE_API_URL` to call the Render backend.
- Login and manager dashboard were tested after deployment.

## Features Tested

- Admin authentication
- Manager dashboard
- Product/menu listing
- Inventory navigation
- Online orders navigation
- Daily reports navigation
- Analytics navigation

## Demo Login

Professor/demo access. This account was added so the professor can log in and test the deployed app:

```text
Email: admin@restaurant.com
Password: admin123
```

Additional seeded demo users:

```text
Waiter: waiter@restaurant.com / waiter123
Client: client@restaurant.com / client123
```

## Known Notes

- Render free services may sleep after inactivity, so the first request can take longer.
- Real `.env` files are ignored and should not be committed.
- Only `.env.example` files are included in the repository.
