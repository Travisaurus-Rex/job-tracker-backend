# Job Tracker Backend

A Node.js backend built with TypeScript, Express, and Prisma to manage job application tracking.  
Designed for easy CRUD operations, user authentication (to be added), and data management.

## Features

- User management (signup/login planned)  
- Track job applications with company, role, status, dates, and notes  
- RESTful API endpoints for job application CRUD  
- Uses Prisma ORM for database management  
- Ready for PostgreSQL or SQLite (default)

## Getting Started

### Prerequisites

- Node.js (v16 or newer recommended)  
- npm or yarn  
- SQLite (default) or PostgreSQL (optional)

### Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/job-tracker-backend.git
   cd job-tracker-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup environment variables:

   Create a `.env` file in the root with:

   ```
   DATABASE_URL="file:./dev.db"
   ```

   Or configure for PostgreSQL:

   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/jobtracker"
   ```

4. Initialize Prisma:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Visit `http://localhost:4000` to confirm the server is running.

## Scripts

- `npm run dev` - Start development server with hot reload  
- `npx prisma studio` - Open Prisma GUI to browse the database

## Project Structure

```
/prisma
  └── schema.prisma    # Prisma schema file
/src
  └── index.ts         # Express server entry point
.env                   # Environment variables
package.json
tsconfig.json
```

## Future Improvements

- Add user authentication (JWT or OAuth)  
- Implement REST API routes for full CRUD functionality  
- Add frontend integration (Next.js or similar)  
- Implement validation, error handling, and testing  
- Dockerize for easier deployment

## License

MIT © Your Name
