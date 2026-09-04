# Multi-DB E-Commerce Backend

A backend-only e-commerce application built with Node.js, TypeScript, Express, MySQL, MongoDB, Prisma, and Mongoose.

The primary purpose of this project is not simply to build an e-commerce API, but to understand how a scalable backend can be structured using **Clean Architecture, CQRS, Repository Pattern, Use Case Pattern, Domain Events, Event-driven read-model synchronization, and Manual Dependency Injection**.

---

## Why This Project Matters

Many backend applications start with a simple structure:

```text
Controller
    ↓
Service
    ↓
Database
```

This works for small applications, but as the system grows, business logic, database code, HTTP concerns, and infrastructure dependencies can become tightly coupled.

This project explores a different approach.

The application separates:

* Business rules
* Application use cases
* Database implementations
* HTTP/API concerns
* Write and read responsibilities

The result is an architecture where the core business logic does not depend directly on frameworks or databases.

The project also demonstrates a **multi-database architecture**:

* **MySQL** is the source of truth and handles transactional writes.
* **MongoDB** acts as a read database for optimized read models.
* **Domain events** communicate changes.
* **Projections** synchronize MongoDB read models with changes made to MySQL.

This makes the project useful as a practical study of how patterns used in larger backend systems can be implemented without immediately introducing unnecessary infrastructure such as Kafka or RabbitMQ.

---

# Project Goals

The project was created to gain practical understanding of:

* Node.js backend development
* Express
* TypeScript
* Clean Architecture
* CQRS
* MySQL
* MongoDB
* Prisma
* Mongoose
* JWT authentication
* bcrypt password hashing
* Repository Pattern
* Use Case Pattern
* Domain Events
* Event Bus
* Projections / Read Models
* REST API design
* Manual Dependency Injection
* Relational database modeling
* Multi-database synchronization
* Git feature-branch workflow
* API testing with Postman

The project intentionally remains simple enough to understand while following professional backend architectural principles.

---

# Technology Stack

| Technology                      | Purpose                                  |
| ------------------------------- | ---------------------------------------- |
| Node.js                         | Backend runtime                          |
| Express                         | HTTP server and REST API                 |
| TypeScript                      | Type-safe application development        |
| MySQL                           | Primary transactional/write database     |
| Prisma                          | MySQL ORM and database access            |
| MariaDB Driver / Prisma Adapter | Prisma database connectivity             |
| MongoDB                         | Read database                            |
| Mongoose                        | MongoDB modeling and access              |
| JWT                             | Authentication and access/refresh tokens |
| bcrypt                          | Password hashing                         |
| Postman                         | API testing                              |
| Clean Architecture              | Application structure                    |
| CQRS                            | Separation of commands and queries       |
| In-Memory Event Bus             | Event dispatching                        |
| Manual DI                       | Dependency management                    |

---

# Architecture

The application follows:

**Clean Architecture + CQRS + Repository Pattern + Use Cases + Domain Events**

High-level structure:

```text
                HTTP Request
                     │
                     ▼
              ┌─────────────┐
              │ Controller  │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │  Use Case   │
              └──────┬──────┘
                     │
             Domain Contracts
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
      MySQL                  MongoDB
   Write Database          Read Database
          │                     ▲
          │                     │
          ▼                     │
       Domain Event ───► Projection
```

---

# Clean Architecture

The source code is divided into four main layers:

```text
src/
├── domain/
├── application/
├── infrastructure/
└── interfaces/
```

### Domain

Contains the business concepts and contracts.

Examples:

* Entities
* Repository interfaces
* Domain events
* Domain services

The domain does **not** depend on:

* Express
* Prisma
* MongoDB
* Mongoose
* HTTP
* Database-specific implementation details

### Application

Contains application-specific business operations.

Examples:

* Use cases
* Event bus
* Projections

Use cases depend on abstractions rather than concrete database implementations.

### Infrastructure

Contains technology-specific implementations.

Examples:

* Prisma repositories
* MySQL connection
* Mongoose repositories
* MongoDB models
* Database configuration

### Interfaces

Contains external entry points into the application.

Examples:

* Controllers
* Routers
* HTTP-related concerns

Controllers remain thin and delegate business operations to use cases.

---

# Dependency Direction

The dependency direction is intentionally controlled:

```text
Interfaces
     ↓
Application
     ↓
Domain

Infrastructure
     ↓
implements Domain/Application contracts
```

The important principle is:

> Inner layers should not depend on outer infrastructure.

For example:

```text
CreateProduct
      │
      ▼
IProductRepository
      ▲
      │
PrismaProductRepository
```

The use case knows about `IProductRepository`, not Prisma.

This makes the application easier to test and prevents infrastructure technology from spreading into business logic.

---

# CQRS

The project uses **Command Query Responsibility Segregation (CQRS)**.

Commands and queries have different responsibilities.

### Commands

Commands modify state.

```text
HTTP Request
     ↓
Command Use Case
     ↓
MySQL
```

Example:

```text
CreateProduct
AddProductToCart
```

### Queries

Queries retrieve data.

For Product:

```text
HTTP Request
     ↓
Query Use Case
     ↓
MongoDB
     ↓
Read Model
```

Examples:

```text
GetProducts
GetProductById
GetCart
```

The important rule is:

```text
Commands → MySQL
Queries  → MongoDB
```

MySQL remains the **source of truth**, while MongoDB contains derived read data.

---

# Multi-Database Design

One of the main learning objectives of this project is understanding how two different databases can have different responsibilities.

## MySQL

MySQL is the primary transactional database.

It stores authoritative application state such as:

* Users
* Refresh tokens
* Products
* Carts
* Cart items

Commands write to MySQL.

```text
Command
   ↓
MySQL
```

## MongoDB

MongoDB is used as a read database.

It contains derived read models optimized for queries.

```text
MySQL
  ↓
Domain Event
  ↓
Event Bus
  ↓
Projection
  ↓
MongoDB Read Model
```

MongoDB is therefore **not the source of truth**.

If a read model needs to be rebuilt, it can conceptually be reconstructed from the authoritative data.

---

# Event-Driven Read Model Synchronization

The Product domain demonstrates the complete CQRS flow.

When a product is created:

```text
CreateProduct
     ↓
MySQL
     ↓
ProductCreated
     ↓
InMemoryEventBus
     ↓
ProductProjection
     ↓
MongoDB
```

The command does not directly update MongoDB.

Instead, the command reports that something happened through a domain event.

The projection is responsible for updating the read model.

This keeps command and query responsibilities separated.

---

# Event Bus

The project currently uses an **in-process Event Bus**.

Conceptually:

```text
Publisher
    ↓
Event Bus
    ↓
Subscribers
```

For example:

```text
ProductCreated
      ↓
ProductProjection
      ↓
MongoDB
```

An in-memory implementation was deliberately chosen to keep the project understandable.

A production system could later evolve toward:

```text
Application
    ↓
Transactional Outbox
    ↓
Message Broker
    ↓
Consumers
    ↓
Projections
```

Possible technologies could include Kafka or RabbitMQ, but they are intentionally not introduced prematurely in this project.

---

# Repository Pattern

Database access is abstracted behind repository contracts.

For example:

```text
IProductRepository
       ▲
       │
PrismaProductRepository
```

The domain/application layer depends on the interface.

Infrastructure provides the implementation.

This allows the implementation to change without changing the business use case.

For example:

```text
IProductRepository
       ▲
       │
PrismaProductRepository
```

could later be replaced with another implementation without changing `CreateProduct`.

---

# Use Case Pattern

Business operations are represented as individual use cases.

Examples:

```text
RegisterUser
LoginUser
RefreshAccessToken

CreateProduct
GetProducts
GetProductById

AddProductToCart
GetCart
RemoveCartItem
ClearCart
```

Each use case represents one meaningful application operation.

This prevents controllers from becoming large business-logic containers.

---

# Manual Dependency Injection

The project uses **Manual Dependency Injection** instead of a dependency injection framework.

Dependencies are created in the composition/router layer and passed into constructors.

Example:

```text
Router
   ↓
Create Repository
   ↓
Create Use Case
   ↓
Create Controller
   ↓
Register Routes
```

The use case does not create its own repository.

Instead:

```text
Router
   ↓
PrismaProductRepository
   ↓
CreateProduct(repository)
```

This keeps dependencies explicit and makes use cases easier to test.

---

# Current Project Structure

The project currently follows this general structure:

```text
src/
│
├── domain/
│   ├── entities/
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   └── Cart.ts
│   │
│   ├── repositories/
│   │   ├── IUserRepository.ts
│   │   ├── IProductRepository.ts
│   │   ├── IProductReadRepository.ts
│   │   ├── IProductReadModelRepository.ts
│   │   └── ICartRepository.ts
│   │
│   └── events/
│       └── ProductCreated.ts
│
├── application/
│   ├── events/
│   │   └── InMemoryEventBus.ts
│   │
│   ├── auth/
│   │   └── use-cases/
│   │       ├── RegisterUser.ts
│   │       ├── LoginUser.ts
│   │       └── RefreshAccessToken.ts
│   │
│   ├── product/
│   │   ├── use-cases/
│   │   │   ├── CreateProduct.ts
│   │   │   ├── GetProducts.ts
│   │   │   └── GetProductById.ts
│   │   │
│   │   └── projections/
│   │       └── ProductProjection.ts
│   │
│   └── cart/
│       └── use-cases/
│           ├── AddProductToCart.ts
│           ├── GetCart.ts
│           ├── RemoveCartItem.ts
│           └── ClearCart.ts
│
├── infrastructure/
│   ├── database/
│   │   ├── mysql/
│   │   │   └── repositories/
│   │   │       ├── PrismaUserRepository.ts
│   │   │       ├── PrismaProductRepository.ts
│   │   │       └── PrismaCartRepository.ts
│   │   │
│   │   └── mongodb/
│   │       ├── client/
│   │       │   └── mongoose.ts
│   │       │
│   │       ├── models/
│   │       │   └── ProductReadModel.ts
│   │       │
│   │       └── repositories/
│   │           ├── MongooseProductReadRepository.ts
│   │           └── MongooseProductReadModelRepository.ts
│   │
│   └── services/
│       ├── BcryptPasswordService.ts
│       └── JwtTokenService.ts
│
└── interfaces/
    └── http/
        ├── controllers/
        │   ├── AuthController.ts
        │   ├── ProductController.ts
        │   └── CartController.ts
        │
        └── routes/
            ├── AuthRouter.ts
            ├── ProductRouter.ts
            └── CartRouter.ts
```

---

# Authentication

Authentication is implemented using JWT.

The authentication flow includes:

```text
Register
   ↓
Password Hashing
   ↓
MySQL User
```

Login:

```text
Login Request
     ↓
Find User
     ↓
Compare Password
     ↓
Generate Access Token
     ↓
Generate Refresh Token
```

Access tokens are short-lived, while refresh tokens have a longer lifetime.

Refresh tokens are hashed using SHA-256 before being persisted to MySQL.

This prevents storing raw refresh tokens in the database.

---

# Product Domain

The Product domain currently supports:

```text
CREATE
READ ALL
READ ONE
```

Product writes go to MySQL.

Product reads go through MongoDB read models.

The Product domain is currently the main demonstration of the CQRS/event-driven architecture.

---

# Cart Domain

The Cart domain has been implemented using MySQL.

Conceptually:

```text
User
  │
  └── Cart
       │
       └── CartItems
            ├── productId
            └── quantity
```

A cart references products using their IDs rather than duplicating the complete Product entity.

Implemented operations:

```text
Add Product to Cart
Get Cart
Remove Cart Item
Clear Cart
```

When adding an existing product to a cart, its quantity is increased rather than creating a duplicate cart item.

The cart persistence uses:

```text
Cart
  │
  └── CartItem[]
```

with a unique constraint on:

```text
(cartId, productId)
```

---

# Database Model

The main relational relationships include:

```text
User
 │
 └── Cart
       │
       └── CartItem
              │
              └── Product
```

This allows:

* One user to have one cart
* One cart to contain multiple cart items
* Each cart item to reference a product
* The same product to appear only once per cart

---

# API

The backend runs on:

```text
http://localhost:3001
```

Base API:

```text
/api
```

Current API areas include:

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

### Products

Product endpoints support the currently implemented create and read operations.

### Cart

```text
POST   /api/cart/items
GET    /api/cart
DELETE /api/cart/items/:productId
DELETE /api/cart
```

Authentication middleware is planned as part of the next authentication improvement phase, so the current cart implementation temporarily receives the user ID through the request body.

---

# Error Handling and Validation

The current application still has improvements planned around centralized error handling and request validation.

Planned HTTP error handling includes:

```text
400 Bad Request
401 Unauthorized
404 Not Found
409 Conflict
500 Internal Server Error
```

Request validation will eventually use:

**Zod**

for validating:

* Request bodies
* Route parameters
* Other external inputs

---

# Testing

The API has been manually tested using Postman.

Current verification includes:

* Authentication flow
* Product creation
* Product queries
* Product read-model synchronization
* Cart creation
* Adding products to cart
* Increasing quantity of an existing product
* Retrieving cart
* Removing cart items
* Clearing cart

Automated tests are planned as a future improvement.

---

# Development Principles

The following architectural rules are intentionally preserved throughout the project:

### 1. Domain independence

The domain must remain independent of frameworks and databases.

### 2. Abstraction-based use cases

Use cases depend on interfaces rather than concrete infrastructure.

### 3. Infrastructure implements contracts

Database-specific implementations remain inside infrastructure.

### 4. Thin controllers

Controllers handle HTTP concerns and delegate business operations.

### 5. Commands write to MySQL

MySQL is the source of truth.

### 6. Queries read from MongoDB

MongoDB contains derived read models.

### 7. Events communicate state changes

Events describe that something happened.

### 8. Projections update read models

Projections synchronize derived read models.

### 9. Avoid premature infrastructure

Kafka/RabbitMQ are not introduced until there is an actual requirement.

### 10. Avoid unnecessary abstractions

Architecture is kept explicit and understandable instead of adding layers simply for the sake of patterns.

---

# Git Workflow

The project uses feature branches.

Examples:

```text
feature/user-domain
feature/mongodb-read-db
feature/product-domain
```

Changes are integrated through branches and conventional commit messages are used.

Example:

```text
feat: complete e-commerce backend architecture and cart domain
```

---

# Running the Project

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MySQL / MariaDB
* MongoDB
* Git

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file containing the required database and authentication configuration.

Example structure:

```env
DATABASE_URL=your_mysql_connection_string

MONGODB_URL=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

Do not commit `.env` to the repository.

---

## Prisma

Generate the Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

---

## Start the Server

Run the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3001/api
```

---

# Architectural Flow Examples

## Product Creation

```text
POST /products
       ↓
ProductController
       ↓
CreateProduct
       ↓
IProductRepository
       ↓
PrismaProductRepository
       ↓
MySQL
       ↓
ProductCreated
       ↓
InMemoryEventBus
       ↓
ProductProjection
       ↓
MongoDB
```

## Product Query

```text
GET /products
       ↓
ProductController
       ↓
GetProducts
       ↓
IProductReadRepository
       ↓
MongooseProductReadRepository
       ↓
MongoDB
       ↓
Product Read Model
```

## Add Product to Cart

```text
POST /cart/items
       ↓
CartController
       ↓
AddProductToCart
       ↓
ICartRepository
       ↓
PrismaCartRepository
       ↓
MySQL
```

---

# What Has Been Completed

### Project Foundation

* Node.js + TypeScript setup
* Express application
* Clean Architecture structure
* Manual Dependency Injection
* Prisma configuration
* MySQL integration
* MongoDB/Mongoose integration

### Authentication

* User domain
* User repository
* Registration
* Login
* bcrypt password hashing
* JWT access tokens
* JWT refresh tokens
* Refresh token persistence
* SHA-256 refresh-token hashing
* Refresh access-token flow

### Product

* Product entity
* Product repository contract
* Prisma Product repository
* Product creation
* Product queries
* MongoDB read model
* Product projection
* ProductCreated event
* In-memory event bus
* CQRS write/read flow

### Cart

* Cart entity
* CartItem model
* Cart repository contract
* Prisma Cart repository
* Add product to cart
* Get cart
* Remove cart item
* Clear cart
* Cart quantity accumulation
* Relational constraints
* Manual API testing

---

# Future Improvements

The project is intentionally being developed incrementally.

Planned improvements include:

## Authentication

* Authentication middleware
* Bearer token extraction
* JWT verification middleware
* Authenticated request context
* Centralized error handling
* Zod validation
* Automated tests
* Refresh-token rotation
* Token revocation/logout
* Stronger token lifecycle management

## Product

* Update Product
* Delete Product
* `ProductUpdated` event
* `ProductDeleted` event
* Corresponding MongoDB projections

The CQRS flow will remain:

```text
Command
   ↓
MySQL
   ↓
Domain Event
   ↓
Projection
   ↓
MongoDB
```

## Future Domains

Additional e-commerce domains can be introduced incrementally:

```text
Cart
  ↓
Order
  ↓
Payment
  ↓
Inventory
  ↓
Review
  ↓
Category
```

Each domain will follow the same architectural principles rather than blindly duplicating implementation details.

---

# Production Evolution

The current implementation intentionally uses an in-process Event Bus.

A production evolution could introduce:

```text
MySQL Transaction
       ↓
Transactional Outbox
       ↓
Message Broker
       ↓
Event Consumers
       ↓
Read Model Projections
```

This would provide stronger guarantees around event delivery and database/event consistency.

The project does not introduce this complexity until it becomes necessary.

---

# Key Engineering Concepts Demonstrated

This project provides practical implementation experience with:

* Clean Architecture
* Separation of concerns
* Dependency inversion
* Repository Pattern
* Use Case Pattern
* Manual Dependency Injection
* CQRS
* Domain Events
* Event-driven architecture
* Event Bus
* Read Models
* Projections
* Multi-database architecture
* MySQL as source of truth
* MongoDB derived read models
* JWT authentication
* Refresh-token security
* Password hashing
* Relational database modeling
* Database transactions
* REST API design
* Feature-based Git workflow

---

# Learning Outcome

The main outcome of this project is understanding **why backend architecture matters**, rather than simply learning individual technologies.

Instead of treating the application as:

```text
API → Database
```

the project explores:

```text
HTTP
 ↓
Controllers
 ↓
Use Cases
 ↓
Domain Contracts
 ↓
Infrastructure

Commands → MySQL → Events → Projections → MongoDB
Queries  → MongoDB
```

This separation makes responsibilities explicit and provides a foundation that can evolve as the application grows.

---

# Project Status

**Status: In active development**

### Current milestone

```text
Foundation        
Authentication    
Product CQRS      
Cart Domain       
```

The project will continue to evolve domain-by-domain while preserving the core architectural principles.

---

# Author

**Adithyan**

This project is built as a backend engineering learning and portfolio project, with emphasis on understanding architectural decisions, design patterns, database responsibilities, and scalable backend development.
