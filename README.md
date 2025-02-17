# Railroad

Railroad is a web application for calculating routes and distances between various locations on a railroad network. The application is built with a React frontend and a Node.js backend.

## Features

### Backend Features

- **Rate Limiting**: Implemented rate limiting to prevent abuse and ensure fair usage of the API.
- **Authentication and Authorization**: Utilized JWT (JSON Web Token) for secure authentication and authorization.
  - **Role-Based Access Control (RBAC)**: Introduced two roles - Public and Admin. 
  - **All APIs are allowed for the Admin role, while the /distance endpoint is only permitted for the Public role. For more details, refer to   backend/api/railroadRoutes.js
- **Unit Tests**: Used Jest for unit testing, covering critical functionality.
- **Validation**: Applied Express Validators to ensure valid data input.
- **Exception Handling**: Implemented robust exception handling for anomalies in route calculations.
- **Logging**: Applied logging mechanism across the application with daily log rotation.

### Frontend Features

- **Responsive Design**: Developed a responsive application to provide a good user experience across different devices.
- **Error Handling**: Implemented comprehensive error handling to improve user experience and debugging.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
  - [Routes](#routes)
  - [Distance Calculator](#distance-calculator)
  - [Shortest Route](#shortest-route)
- [Assumptions](#assumptions)
- [Algorithms Used] (#Algorithms Used)

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v20.18.0 or later)
- npm (v10.8.2 or later)

### Clone the Repository



### Install Dependencies

- Backend
    Navigate to the backend directory and install the dependencies:
    sh/cmd
    cd backend
    npm install

- Frontend
    Navigate to the frontend directory and install the dependencies:
    sh/cmd
    cd ../frontend
    npm install

### Run Test Cases

sh/cmd
cd ../backend
npm install jest@20
npm test


## Setup

### Backend

- Start the Backend Server:
    sh/cmd
    cd ../backend
    npm start

### Frontend

- Start the Frontend Server:
    sh/cmd
    cd ../frontend
    npm start

## Usage

### Access the Application:

- Open your web browser and navigate to http://localhost:3000.

### Routes

1- Select Start and End Locations:
   Use the dropdown menus to select the starting and ending locations.

2- Choose Search Criteria:
   Select the search criteria from the dropdown menu (max stops, exact stops, or max distance).
   Max Stops: Enter the maximum number of stops and click on the "Search" button to find routes with up to the specified number of stops.
   Exact Stops: Enter the exact number of stops and click on the "Search" button to find routes with the specified number of stops.
   Max Distance: Enter the maximum distance and click on the "Search" button to find routes with a distance less than or equal to the specified value.

3- View Results:
   The routes satisfying the search criteria will be displayed in a table. If no routes satisfy the criteria, an error message will be shown.

### Distance Calculator

1- Enter Path:
   Enter the path using hyphen-separated capital letters (e.g., A-B-C).

2- Calculate Distance:
   Click on the "Calculate Distance" button to calculate the distance for the entered path.

3- View Result:
   The calculated distance will be displayed on the screen. If the path is invalid, an error message will be shown.

### Shortest Route

1- Select Start and End Locations:
   Use the dropdown menus to select the starting and ending locations.

2- Find Shorest Route:
   Click on the "Find Shorest Route" button to find the shorest route for the selected locations.

3- View Result:
   The shorest route will be displayed on the screen. If the path is invalid, an error message will be shown.

## Assumptions

- Due to time limitations, a JWT role-based token for the admin user has been generated and is used while accessing the server-side APIs.(stored in config.js file under frontend/src). For testing purposes, the validity of the token is set to 200 hours. In real applications, the token should expire after 1 hour and be dynamically generated by the backend application.

- Defined a 2D array initializing the Railroad Graph as per the problem description (can be found under backend/middleware/railroadMiddleware.js).

- Built a layer to generate access tokens based on roles (can be executed under the backend folder using the command node auth/generateToken.js).

## Algorithms Used

### DistanceCalculator
- The algorithm used in this `DistanceCalculator` class is a straightforward path distance calculation algorithm.

### RouteCalculator
- The `RouteCalculator` class in the provided code uses a combination of Depth-First Search (DFS) and Backtracking algorithms to find routes in a graph with specific constraints such as the maximum number of stops, exact number of stops, and maximum distance.

### ShortRouteCalculator
- The algorithm used in the `ShortRouteCalculator` class to find the shortest route from a start node to an end node is Dijkstra's Algorithm. This algorithm is well-suited for finding the shortest paths in a graph with non-negative edge weights.