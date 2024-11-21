# Saman E-commerce

Welcome to the **Saman E-commerce Web Application**! This is a full-stack e-commerce platform built with the **MERN stack** (MongoDB, Express.js, React, Node.js). The platform provides an intuitive online shopping experience, allowing users to browse, shop, and manage their orders securely.

[![Watch the video](https://img.youtube.com/vi/3f4DREnGzrc/0.jpg)](https://www.youtube.com/watch?v=3f4DREnGzrc)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [MERN Stack](#mern-stack)
- [Deployment Information](#deployment-information)
- [Application Workflow](#application-workflow)
- [Author](#author)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## Introduction

**Saman** is a modern, responsive e-commerce web application designed to provide a seamless shopping experience. The platform includes features like product search, filtering, order management, and a dedicated admin dashboard. While the payment process is currently a dummy (using PayPal with Braintree setup for simulation), real payment gateways such as **eSewa** and **Khalti** will be integrated soon. For now, the application allows users to proceed with the checkout process as a mock transaction.

This project showcases the power of the **MERN** stack, combining **MongoDB** for data storage, **Express** and **Node.js** for the backend, and **React** for a dynamic frontend.

## Features

- **User Authentication**: Users can sign up, log in, and manage their accounts.
- **Product Listings**: Browse and filter products with an intuitive UI.
- **Shopping Cart**: Add products to your cart, adjust quantities, and proceed to checkout.
- **Secure Payment**: Integration with Stripe or PayPal for secure transactions.
- **Order Management**: Users can view past orders and track the status of their current purchases.
- **Admin Panel**: Admin users can manage products, users, and orders from a centralized dashboard.
- **Responsive Design**: Fully responsive and optimized for mobile and desktop devices.

## Technologies Used

- **Frontend**: React, Bootstrap
- **Backend**: Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: paypal , and cards dummy enviroment
- **version control**: github
- **Deployment**:
  - Frontend: **Vercel**
  - Backend: **Render**
  - Database: **MongoDB Atlas**

## MERN Stack

This project utilizes the **MERN stack**, which includes:

- **MongoDB**: NoSQL database to store user data, products, orders, and more. MongoDB Atlas is used for database hosting and management.
- **Express.js**: Web framework for Node.js to handle routing and API requests.
- **React**: A powerful front-end library for building interactive UIs.
- **Node.js**: Server-side runtime for handling backend operations.

## Deployment Information

- **Frontend** is hosted on **Vercel** for fast, scalable, and secure deployment.
- **Backend** is deployed on **Render**, providing a serverless architecture for handling API requests and processing orders.
- **MongoDB Atlas** is used for hosting the MongoDB database in the cloud, ensuring scalability and reliability.

### MongoDB Atlas Connection

This application uses **MongoDB Atlas** for database hosting. You'll need to set up a MongoDB cluster and provide the connection string in the `.env` file to connect your backend to the database.

## Application Workflow

1. **Browse Products**: Users can view the product catalog, use filters, and search for specific items.
2. **Add to Cart**: Items are added to the shopping cart, and users can manage quantities before checkout.
3. **Checkout & Payment**: Users proceed to checkout, input shipping information, and complete the payment via Stripe/PayPal.
4. **Order Confirmation**: After payment, an order confirmation is shown.
5. **Admin Panel**: Admins can manage inventory, orders, and customer data through a dedicated dashboard.

## Author

This project was created by **[safal lama]**. Feel free to reach out for any contributions or inquiries.

## Contributing

Contributions are welcome! If you'd like to improve the project, feel free to fork the repository and submit a pull request. Here's how you can contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request with a description of your changes.

## Acknowledgments

- [MERN Stack Documentation](https://www.mongodb.com/mern-stack)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
