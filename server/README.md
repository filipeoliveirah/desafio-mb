# Registration Server

A simple Express.js server application that handles form submissions from the client application. This server provides endpoints for rendering a registration form and receiving form data.

## Features

- RESTful API for form submissions
- Simple validation for form data
- CORS enabled for cross-origin requests
- Environment variable configuration with dotenv

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

## Installation

1. Clone the repository (if you haven't already)

2. Navigate to the server directory:

```sh
cd server
```

3. Install dependencies

```sh
npm install
```

4. Create dot env file or run default port (3000)

```sh
touch .env
```

## Start the server in development mode

```sh
npm run start
```

## Project Structure
server/
├── node_modules/
├── public/           # Static files
│   └── index.html    # Main HTML page
├── routes/
│   └── registration.js # Registration routes
├── .env              # Environment variables
├── package.json      # Project dependencies
├── package-lock.json
├── README.md         # This file
└── server.js         # Main application file