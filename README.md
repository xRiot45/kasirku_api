<p align="center">
  <a href="#" target="blank"><img src="./assets/images/logo.png" width="200" alt="Kasirku Logo" /></a>
</p>

<p align="center">Kasirku RESTful API</p>
<p align="center">

## Description

Kasirku is a mobile web-based application, and RESTful API designed to support transaction management and cashier operations, as part of the final project of the Web Service Technology course in Semester 5.

- **Version :** v1.0.0
- **Developer :** Thomas Alberto
- **Released On :** November 20 2024
- **Status :** Stable Release
- **Contact :** [tomasalberto527@gmail.com](mailto:tomasalberto527@gmail.com)

## Contents

1. [Description](#description)
2. [System Requirements](#system-requirements)
3. [Tech Stack](#tech-stack)
4. [Security](#security)
5. [Installation](#installation)
6. [Setup Environment Variable](#setup-environtment-variable)
7. [Running the App](#running-the-app)
8. [Features](#features)
9. [Authorization](#authorization)

## System Requirements

- Linux, Windows or MacOS
- Node JS v18 or later
- MySQL
- npm (Node Package Manager)

## Tech Stack

- Nest JS
- Type ORM
- MySQL
- TypeScript
- Node JS

## Security

- Authentication
- Encryption and Hasing
- Authorization
- Cors
- Rate Limiting

## Installation

```bash
# Clone project
$ git clone https://github.com/xRiot45/kasirku_api.git

# Navigate to project repository
$ cd kasirku_api

# Install all dependencies
$ npm install
```

## Setup Environment Variable

```bash
# Change name file
$ cp .env.example .env

# Application
APP_URL= # Application URL
APP_NAME= # Application Name
APP_PORT= # Application Port
APP_ENV= # Application Environment

# Database
MYSQL_HOST= # MySQL Host
MYSQL_PORT= # MySQL Port
MYSQL_USERNAME= # MySQL Username
MYSQL_PASSWORD= # MySQL Password
MYSQL_DATABASE= # MySQL Database
MYSQL_SYNCHRONIZE= # MySQL Synchronize

# Jwt
ACCESS_TOKEN_SECRET= # Your Access Token Secret for JWT
REFRESH_TOKEN_SECRET= # Your Refresh Token Secret for JWT
```

## Running The App

```bash
# Watch mode
$ npm run start

# Development mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## Features

### Authentication API

#### 1. Login

- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Authenticates the user and returns a token for accessing protected routes.

#### 2. Register

- **Endpoint:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user into the system.

#### 3. Refresh Token

- **Endpoint:** `/api/auth/refresh-token`
- **Method:** `POST`
- **Description:** Refreshes the authentication token.

#### 4. Logout

- **Endpoint:** `/api/auth/logout`
- **Method:** `DELETE`
- **Description:** Logs the user out and invalidates the session.

### Role API

- **Endpoint:** `/api/role`
- **Methods:**
  - `POST /create`: Create a new role.
  - `GET`: Get all roles.
  - `GET /show/{roleId}`: Get a specific role by ID.
  - `PUT /{roleId}`: Update a role by ID.
  - `DELETE /{roleId}`: Delete a role by ID.

### Product Category API

- **Endpoint:** `/api/product-category`
- **Methods:**
  - `POST /create`: Create a new product category.
  - `GET`: Get all product categories.
  - `GET /show/{productCategoryId}`: Get a specific product category by ID.
  - `PUT /{productCategoryId}`: Update a product category by ID.
  - `DELETE /{productCategoryId}`: Delete a product category by ID.

### Users API

#### 1. Get Data

- **Endpoint:** `/api/users/me`
- **Method:** `GET`
- **Description:** Retrieve data of a specific user by their access token.

#### 2. Get All Users

- **Endpoint:** `/api/users`
- **Method:** `GET`
- **Description:** Get a list of all users in the system.

#### 3. Get User by ID

- **Endpoint:** `/api/users/show/{userId}`
- **Method:** `GET`
- **Description:** Get user details by their ID.

#### 4. Reset Password by Admin

- **Endpoint:** `/api/users/reset-password/{userId}`
- **Method:** `PUT`
- **Description:** Allows an admin to reset a user's password.

#### 5. Delete User

- **Endpoint:** `/api/users/delete/{userId}`
- **Method:** `DELETE`
- **Description:** Delete a specific user by their ID.

#### 6. Update Profile

- **Endpoint:** `/api/users/update-profile`
- **Method:** `PUT`
- **Description:** Update the logged-in user's profile.

#### 7. Update Profile by Admin

- **Endpoint:** `/api/users/update-profile/{userId}`
- **Method:** `PUT`
- **Description:** Admin can update any user's profile.

### Product API

- **Endpoint:** `/api/products`
- **Methods:**
  - `POST /create`: Create a new product.
  - `GET`: Get all products.
  - `GET /show/{productId}`: Get a specific product by ID.
  - `PUT /{productId}`: Update a product by ID.
  - `DELETE /{productId}`: Delete a product by ID.

### Carts API

#### 1. Add Product to Cart

- **Endpoint:** `/api/carts/add-product-to-cart`
- **Method:** `POST`
- **Description:** Add a product to cart.

#### 2. Get All Data Carts

- **Endpoint:** `/api/carts/all`
- **Method:** `GET`
- **Description:** Retrieve all cart data.

#### 3. Delete Cart by ID

- **Endpoint:** `/api/carts/delete/{cartId}`
- **Method:** `DELETE`
- **Description:** Remove a product from the cart by ID.

#### 4. Delete All Carts

- **Endpoint:** `/api/carts/delete/all`
- **Method:** `DELETE`
- **Description:** Remove all product from cart.

### Orders API

#### 1. Create Order

- **Endpoint:** `/api/orders/create`
- **Method:** `POST`
- **Description:** Create a new order.

#### 2. Get All Data Orders

- **Endpoint:** `/api/orders/all`
- **Method:** `GET`
- **Description:** Retrieve all orders.

#### 3. Get Data Order by ID

- **Endpoint:** `/api/orders/show/{orderId}`
- **Method:** `GET`
- **Description:** Get order details by ID.

#### 4. Delete Order by ID

- **Endpoint:** `/api/orders/delete/{orderId}`
- **Method:** `DELETE`
- **Description:** Delete an order by its ID.

#### 5. Delete All Orders

- **Endpoint:** `/api/ordersdelete/`
- **Method:** `DELETE`
- **Description:** Delete all orders.

### Checkout API

#### 1. Checkout Order

- **Endpoint:** `/api/checkout/create`
- **Method:** `POST`
- **Description:** Proceed to checkout for the order.

#### 2. Get All Data Checkout

- **Endpoint:** `/api/checkout/all`
- **Method:** `GET`
- **Description:** Retrieve all checkout data.

#### 3. Get Data Checkout by ID

- **Endpoint:** `/api/checkout/show/{checkoutId}`
- **Method:** `GET`
- **Description:** Get checkout details by ID.

#### 4. Change Order Status to Confirmed

- **Endpoint:** `/api/checkout/status/confirmed/{checkoutId}`
- **Method:** `PUT`
- **Description:** Update the order status to 'confirmed'.

#### 5. Change Order Status to Processed

- **Endpoint:** `/api/checkout/status/processed/{checkoutId}`
- **Method:** `PUT`
- **Description:** Update the order status to 'processed'.

#### 6. Change Order Status to Completed

- **Endpoint:** `/api/checkout/status/completed/{checkoutId}`
- **Method:** `PUT`
- **Description:** Update the order status to 'completed'.

#### 7. Change Order Status to Cancelled

- **Endpoint:** `/api/checkout/status/cancelled/{checkoutId}`
- **Method:** `PUT`
- **Description:** Update the order status to 'cancelled'.

#### 8. Remove Checkout

- **Endpoint:** `/api/checkout/delete/{checkoutId}`
- **Method:** `DELETE`
- **Description:** Remove checkout record by ID.

### Reports API

#### 1. Create Reports

- **Endpoint:** `/api/reports/create`
- **Method:** `POST`
- **Description:** Create a new report.

#### 2. Get All Data Reports

- **Endpoint:** `/api/reports/all`
- **Method:** `GET`
- **Description:** Get all reports data.

#### 3. Get Data Report by ID

- **Endpoint:** `/api/reports/show/{reportsId}`
- **Method:** `GET`
- **Description:** Get a specific report by ID.

### Charts API

#### 1. Count Data

- **Endpoint:** `/api/charts/count-data`
- **Method:** `GET`
- **Description:** Get the count of data.

#### 2. Count Sale by Year

- **Endpoint:** `/api/charts/sale-by-year`
- **Method:** `GET`
- **Description:** Get the total sales count by year.

#### 3. Count Total Profit

- **Endpoint:** `/api/charts/total-profit`
- **Method:** `GET`
- **Description:** Get the total profit.

#### 4. Count Order Status

- **Endpoint:** `/api/charts/count-order-status`
- **Method:** `GET`
- **Description:** Get the count of orders by status.


## Authorization

Use the following steps to get an authorization token:

- Log in using the /api/auth/login endpoints.
- Use the token received in the response to authorize further requests.