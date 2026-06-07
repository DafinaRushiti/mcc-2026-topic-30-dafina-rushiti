# Database Migration Guide

Topic 30 focus: Cloud Database Migration Playground.

This project uses the restaurant management database as the migration case study. The goal is to document how the schema is prepared locally, moved to a managed/cloud MySQL database, checked, seeded, and rolled back if needed.

## Database Technology

- Database: MySQL
- ORM: Sequelize
- Cloud database provider: Aiven for MySQL
- Backend config: `restoranti-back-main/src/config/database.js`
- Model folder: `restoranti-back-main/src/models`
- Initialization file: `restoranti-back-main/src/config/initDb.js`

## Main Tables

| Table | Purpose |
| --- | --- |
| `users` | Stores clients, waiters, and admins. |
| `products` | Stores restaurant menu and inventory items. |
| `orders` | Stores local and online orders. |
| `order_details` | Stores products and quantities inside each order. |
| `coupons` | Stores generated coupon/receipt details for orders. |
| `daily_reports` | Stores daily sales reports by user and date. |

## Relationships

- `users` has many `orders`.
- `orders` has many `order_details`.
- `products` has many `order_details`.
- `orders` has one `coupon`.
- `users` has many `daily_reports`.

These relationships are defined in `restoranti-back-main/src/config/initDb.js`.

## Local Database Setup

1. Create a MySQL database:

```sql
CREATE DATABASE restorant;
```

2. Copy the backend environment example:

```bash
cp restoranti-back-main/.env.example restoranti-back-main/.env
```

3. Update `restoranti-back-main/.env`:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_database_password
DB_NAME=restorant
PORT=5000
JWT_SECRET=replace_with_a_long_random_secret
```

4. Start the backend:

```bash
cd restoranti-back-main
npm install
npm run dev
```

The backend authenticates the database connection and runs `initDb()`.

## Current Migration Behavior

The current implementation uses Sequelize models and `sequelize.sync({ alter: false })` to check that models match the database without automatically changing existing tables.

The initialization also includes one manual compatibility check:

- checks whether the `orders.metadata` column exists
- if missing, adds `metadata TEXT NULL AFTER total_price`

This supports migration from an older order schema to the current order schema.

## Seed Data

During initialization, the backend checks whether an admin user exists. If no admin exists, it creates:

```text
Email: admin@restaurant.com
Password: admin123
Role: admin
```

For a stronger assignment submission, sample seed data can also include:

- example products/menu items
- sample online and local orders
- sample order details
- sample daily reports

## Cloud Database Migration Plan

1. Create a managed MySQL database with Aiven.
2. Copy the Aiven connection values into backend environment variables.
3. Enable SSL for the cloud database connection.
4. Run the backend against the Aiven database.
5. Confirm all tables exist and relationships work.
6. Seed required admin/sample data.
7. Test restaurant workflows from the frontend.

Cloud database environment example:

```text
DB_HOST=mysql-1a3fbdf3-dafinaarushiti-7d1c.i.aivencloud.com
DB_PORT=18732
DB_USER=avnadmin
DB_PASS=your_aiven_password
DB_NAME=defaultdb
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
PORT=5000
JWT_SECRET=replace_with_a_long_random_secret
```

The real password is stored only in `.env` or deployment environment variables and must not be committed.

## Cloud Migration Test Result

The backend was tested successfully against the Aiven MySQL database.

Successful checks:

- backend connected to Aiven MySQL using SSL
- Sequelize created the required tables in `defaultdb`
- tables created: `users`, `products`, `orders`, `order_details`, `coupons`, `daily_reports`
- unique index created for `daily_reports` on `user_id` and `report_date`
- default admin user was created in the cloud database

Backend log evidence:

```text
DB connected!
Database synchronized successfully
Admin user created
```

## Migration Checks

Before considering the migration successful:

- backend logs show a successful database connection
- user login works
- products can be listed and managed
- orders can be created and updated
- coupons/receipts can be generated
- daily reports and analytics load correctly
- no real secrets are committed to Git

## Rollback Plan

If a migration fails:

1. Stop the backend service.
2. Restore the previous database backup or snapshot.
3. Revert the changed migration/schema code.
4. Re-run the backend with the previous `.env` database connection.
5. Verify login, products, orders, coupons, and reports again.

For cloud databases, use provider snapshots/backups before running schema changes.
