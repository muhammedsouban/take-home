# TODO Application

A full-stack **Todo Application** built with modern technologies including **Next.js**, **Node.js**, **PostgreSQL**, and **Express.js**. This application is designed to efficiently manage your tasks with a clean and responsive interface.

---

## Getting Started

After cloning this repository, follow the steps below to set up the application:

### Running the Server

```bash
cd server
npm install --legacy-peer-deps
npm run server
```

### Running the Client

```bash
cd client
npm install --legacy-peer-deps
npm run dev
```

## Technologies Used

### Client Side:
- **React Query**: Simplified server state management.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **TypeScript**: Adds static typing for enhanced code quality and maintainability.
- **Ant Design (antd)**: A UI library for React that provides high-quality components and design systems for building enterprise applications.

### Server Side:
- **Node.js v18**: A fast and efficient JavaScript runtime.
- **Express.js**: Lightweight and flexible web application framework.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Sequelize ORM**: A promise-based ORM for Node.js that supports PostgreSQL, MySQL, MariaDB, SQLite, and more.
- **JSON Web Tokens (JWT)**: For secure user authentication and authorization.
- **bcrypt**: A library to help you hash passwords.

### Common
- **Jest**: Comprehensive JavaScript testing framework for both client and server.


### For sample .env file

```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASS=admin
NODE_ENV=dev
APP_PORT=8080
JWT_TOKEN=token
```
