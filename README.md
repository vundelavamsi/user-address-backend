# User Registration and Address Management Backend

This Node.js application provides an API to register users and store their associated addresses in a relational database. It uses Express.js for server setup, Sequelize ORM for database interactions, and SQLite as the database. The application supports adding multiple addresses for a user and retrieving the list of addresses for each user.

## Technologies Used
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for creating the server and routes.
- **Sequelize ORM**: Object-Relational Mapping (ORM) library for handling database interactions.
- **SQLite**: Lightweight relational database used for storing user and address data.
- **body-parser**: Middleware for parsing request bodies.

## Features
- Register a user with one or multiple addresses.
- Add additional addresses to an already registered user.
- Retrieve all addresses associated with a specific user.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/user-address-backend.git
   cd user-address-backend
2. **Install dependencies**:
    ```bash
    npm install
3. **Run the application**:
    ```bash
    npm start
The server will start at `http://localhost:3000.`

## API Endpoints
1. **Register User with Addresses:**

    **Endpoint:** `/register`

    **Method:** `POST`
    
    Registers a new user with one or more addresses.
    - **Request Body:**
        ```bash
        {
            "name": "John Doe",
            "addresses": ["123 Main St", "456 Oak St"]
        }
    - **Response:**
         - `201 Created:` If the user and addresses are saved successfully.
         - `400 Bad Request:` If there is an error saving the data.

2. **Add Address for Existing User:**

    **Endpoint:** `/user/:userId/address`

    **Method:** `POST`
    
    Adds a new address for an already registered user.
    - **URL Parameters::**
         - `userId:` The ID of the user to add the address for.
    - **Request Body:**
        ```bash
        {
            "address": "789 Pine St"
        }
    - **Response:**
         - `201 Created:` If the address is added successfully.
         - `404 Not Found:` If the user does not exist.
         - `400 Bad Request:` If there is an error adding the address.

3. **Get All Addresses for a User:**

    **Endpoint:** `/user/:userId/addresses`

    **Method:** `GET`
    
    Retrieves all addresses associated with a specific user.
    - **URL Parameters::**
         - `userId:` The ID of the user whose addresses you want to retrieve.
    - **Response:**
         - `200 OK:` Returns a list of addresses for the user.
         - `404 Not Found:` If the user does not exist.
         - `400 Bad Request:` If there is an error fetching the addresses.
    - **Example Response:**
        ```bash
        {
            "user": "John Doe",
            "addresses": [
                {
                "id": 1,
                "address": "123 Main St",
                "userId": 1
                },
                {
                "id": 2,
                "address": "456 Oak St",
                "userId": 1
                }
            ]
        }

## Database Schema
 - User Table:
     - id: Auto-incremented primary key.
     - name: Name of the user.
 - Address Table:
     - id: Auto-incremented primary key.
     - address: Address of the user.
     - userId: Foreign key referencing the user.
