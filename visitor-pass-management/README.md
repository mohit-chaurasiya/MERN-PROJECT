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

  ### Backend
    ```bash
    npm init -y,
    npm install express mongoose ,
    npm install --save-dev nodemon,
    npm install dotenv,
    npm install bcrypt,
    npm install validator,
    npm install jsonwebtoken,
    npm install qrcode,
    npm install pdfkit,
    npm install cors,
    npm install multer,
    npm install nodemailer,
    npm install twilio
    ```
  ### Frontend
   ```
   npm create vite@latest,
   npm install tailwindcss @tailwindcss/vite,
   npm install react-router-dom,
   npm install axios,
   npm install lucide-react,
   npm install react-hot-toast,
   npx shadcn-ui@latest init

   ```


## Running the Application
1. Start the backend server:
   ```bash
   npm run server
   ```
2. Start the frontend server:
   ```
    npm run dev
   ```

## API Endpoints
```
GET  :- / - Home endpoint,
GET  :- /api/admin/login - Admin login endpoint,
POST :-  /api/auth/register - User registration endpoint
GET  :- /api/dashboard/stats
```
## Visitor API Endpoints
```
POST /api/visitors
GET /api/visitors
GEt /api/visitors/search/:query
GET /api/visitors/:id
PATCH /api/visitors/:id
DELETE /api/visitors/:id
```
## apointments API Endpoints
```   
POST /api/appointments
GET /api/appointments
PATCH /appointments/:id/approve
PATCH /appointments/:id/reject
```
## visitor checkin or checkout
```
POST :- /api/check/checkin
POST :- /api/check/checkout
```
## visitor pdf 
```
GET /api/passes/passNumber/badge
```
