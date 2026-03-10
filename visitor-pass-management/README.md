# visitor-pass-management
This project is a visitor pass management system built using the MERN stack. It allows users to manage visitor passes, including creating, updating, and deleting passes. The system also provides features for tracking visitor information and generating reports.

## Features



## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd visitor-pass-management
   ```
3. Install the dependecies

    ```bash
    npm init -y,
    npm install express mongoose ,
    npm install --save-dev nodemon,
    npm install dotenv,
    npm install bcrypt,
    npm install validator,
    npm install jsonwebtoken,
    ```

## Running the Application
1. Start the backend server:
   ```bash
   npm run server
   ```

## API Endpoints
```
GET / - Home endpoint,
GET /admin/login - Admin login endpoint,
POST  /auth/register - User registration endpoint
```
## Visitor API Endpoints
```
POST /api/visitors
GET /api/visitors
GET /api/visitors/:id
PATCH /api/visitors/:id
DELETE /api/visitors/:id
```