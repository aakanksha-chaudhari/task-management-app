# MERN Agent Dashboard

Short Description / Objective
A MERN stack project to build an admin panel for managing agents and distributing tasks from uploaded CSV/XLSX files. Admin can add agents, upload task lists, and view distributed tasks with a clean and simple UI.

---

**** Features

 1. Login Page
- Fields: Email, Password
- Authenticate against MongoDB Admin data
- JWT-based session management
- Redirect to Dashboard on success
- Shows error message on failure
- Clean, simple UI

 2. Dashboard / Home Page
- Overview of total agents and total tasks uploaded
- Navigation menu/sidebar:
  - Add Agent → Agent Management Page
  - Upload CSV / Distribute Tasks → CSV Upload Page
  - View Agents & Tasks → Quick overview of agents and tasks
- Cards or small tables for stats
- Responsive design

3. Agent Management Page
- Add Agent Form: Name, Email, Phone (+ country code), Password
- View Agents Table: Lists all agents
- Backend: `POST /agents/add`, `GET /agents`
- Frontend: Form at top, table below

 4. CSV Upload & Task Distribution Page
- Upload CSV/XLSX/AXLS file
- Validate file type and column format (FirstName, Phone, Notes)
- Distribute tasks equally among 5 agents
- Save distributed tasks in MongoDB
- Display assigned tasks per agent in a table/grid
- Backend: `POST /tasks/upload`, `GET /tasks`
- Frontend: Upload button, table of distributed tasks

---

## Tech Stack

- **Frontend:** 
  - React.js 
  - React Router Dom (for routing between pages)
  - Axios (for API calls)
- **Backend:** 
  - Node.js (runtime environment)
  - Express.js (server framework)
- **Database:** 
  - MongoDB (storing Admin, Agents, and Tasks)
- **Authentication & Security:** 
  - JWT (JSON Web Tokens for session/authentication)
  - Bcrypt (for password hashing)
- **File Handling & Data Processing:** 
  - Multer (for file uploads)
  - CSV-Parser (for parsing CSV files)
  - XLSX (for parsing Excel files)
- **Development Tools:** 
  - Nodemon (for backend auto-reload during development)
  - Dotenv (for environment variables)
  - CORS (for handling cross-origin requests)

## Project Structure

mern-agent-dashboard/
│
├── backend/
│ ├── controllers/ # Route handlers
│ ├── models/ # MongoDB schemas
│ ├── routes/ # API routes
│ ├── middleware/ # JWT auth, validations
│ ├── .env # DB connection string, JWT secret
│ ├── server.js # Backend entry point
│ └── package.json
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/ # Forms, tables, navbar
│ │ ├── pages/ # Login, Dashboard, Agents, Tasks
│ │ ├── utils/ # API calls, helpers
│ │ └── App.js
│ ├── package.json
│ └── .env # API base URL
│
└── README.md

yaml


---

## Setup & Installation

### Backend

cd backend
npm install
Add .env file:

ini

MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
Start backend:

npm run dev   # runs with nodemon
npm start     # runs normally
Frontend

cd frontend
npm install
Add .env file:

ini

REACT_APP_API_URL=http://localhost:5000
Start frontend:



npm start
Usage
Visit http://localhost:3000/

Login with admin credentials

Navigate using the dashboard sidebar:

Add new agents

Upload CSV/XLSX/AXLS to distribute tasks

View agents and their assigned tasks

Admin can see stats and assigned tasks in tables

Sample Data
CSV/XLSX file columns: FirstName, Phone, Notes

Uploadable file types: .csv, .xlsx, .xls

Tasks will be equally distributed among 5 agents










