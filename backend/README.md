# CodeNexus Studio Backend

Backend API for CodeNexus Studio - A web development agency management platform.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Password Hashing**: bcrypt

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Setup Instructions

### 1. Install PostgreSQL

**Windows:**
- Download from https://www.postgresql.org/download/windows/
- Install and remember your postgres user password

**Mac:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE codenexus;

# Exit
\q
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment

Update `.env` file with your PostgreSQL credentials:

```env
PORT=5000
JWT_SECRET=supersecretcodenexuskey123
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/codenexus
NODE_ENV=development
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

### 5. Initialize Database

```bash
npm run init-db
```

This will:
- Create all database tables
- Create default admin user (admin@example.com / admin123)
- Create default manager user (manager@example.com / admin123)

### 6. Start Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on http://localhost:5000

## Default Users

After initialization, you can login with:

**Admin:**
- Email: admin@example.com
- Password: admin123

**Manager:**
- Email: manager@example.com
- Password: admin123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh JWT token

## Database Schema

The application uses the following tables:
- users
- clients
- projects
- leads
- invoices
- communications
- files
- messages
- activities
- contact_inquiries

## Development

The database will auto-sync in development mode. Changes to models will be reflected automatically.

## Troubleshooting

**Connection Error:**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database 'codenexus' exists

**Port Already in Use:**
- Change PORT in .env file
- Or stop the process using port 5000

**Authentication Errors:**
- Verify JWT_SECRET is set in .env
- Check token format in Authorization header
