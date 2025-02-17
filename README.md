# Wine Application (Frontend) - Grupo Rojo

This project contains the frontend part of the final master's project (*Full-Stack Developer*).  
It has been developed using the knowledge acquired in React and JavaScript.

## Table of Contents

1. [Description](#description)
2. [Features](#features)
   1. [General](#general-features)
   2. [Users](#users)
      1. [Administrator](#administrator)
      2. [Consumer](#consumer)
      3. [Visitor](#visitor)
      4. [Winery](#winery)
3. [How to run the project](#how-to-run-the-project)
    1. [Prerequisites](#prerequisites)
    2. [Execution](#execution)
4. [Frontend Architecture](#frontend-architecture)
5. [Authentication and User Management](#authentication-and-user-management)
6. [Routes and Navigation](#routes-and-navigation)
7. [How it was created](#how-it-was-created)
8. [Additional Installed Dependencies](#additional-installed-dependencies)
9. [How to contribute](#how-to-contribute)

---

## Description

This project is the user interface of the wine app, designed to provide an intuitive and personalized experience.  
Users can register, explore wines, rate bottles, and manage their profiles.  
The application is mainly focused on consumers, but wineries also have the opportunity to promote their products and regions.

## Features

### General Features

1. **Age verification** - Visitors must enter their age and are only granted access if they are over 18 years old.
2. **Cookie Policy** - Visitors must accept or reject cookies.
3. **Language** - The application is entirely in Spanish.
4. **Backend Framework** - The server is developed in `Express.js`.
5. **Database** - `MongoDB` is used.
6. **Frontend Framework** - The web application is built with `Vite + React`.
7. **Authentication** - `JWT` is used for secure authentication.
8. **Form Management** - `react-hook-form` is used for validation and form control.

### Users

#### Administrator

This user has full access and permissions to approve or reject winery requests and delete user accounts.

1. Can **register** with administrator credentials.
2. Can **log in and log out**.
3. Can **approve or reject** winery requests.
4. Can **delete user accounts**.

#### Consumer

1. Can **register** and receive credentials.
2. Can **log in and log out**.
3. Can **view and filter** bottles and wineries.
4. Can **edit their profile**.
5. Can **delete their account** freely.

#### Winery

1. Can **register** by providing authenticity certificates.
2. Can **request approval** to add bottles.
3. Can **view and filter** bottles and wineries.
4. Can **request modifications** to their profile.

#### Visitor

1. Can access the web application without registering.
2. Can view and filter information with limited access.

## How to run the project

### Prerequisites

1. Install Node.js dependencies:
    ```bash
    npm install
    ```
2. Create a `.env` file in the project root:
    ```bash
    touch .env
    ```
3. Configure the `.env` file with the following information:
    ```env
    PORT=3000
    VITE_SERVER_URL=http://localhost:$PORT
    ```

### Execution

To start the project, run:

```bash
npm run dev
```

The frontend will run by default at **http://localhost:5173/**.

---

## Frontend Architecture

The frontend code is structured as follows:

```
src/
 ├── components/       # Reusable components
 ├── context/          # Authentication context management
 ├── hooks/            # Custom hooks
 ├── pages/            # Main pages
 ├── utils/            # Utility functions
 ├── main.jsx          # Application entry point
 ├── App.jsx           # Routes configuration
```

## Authentication and User Management

Authentication is managed using `JWT`, with tokens stored in `localStorage`. The `AuthContext` allows user information to be accessed throughout the application.

### Relevant files:
- `/src/context/AuthContext.jsx` → Global user management.
- `/src/hooks/useLogin.js` → Login handling.
- `/src/hooks/useLogout.js` → Logout handling.

## Routes and Navigation

Navigation is managed using `react-router-dom` in `App.jsx`.

| Route               | Rendered Component           |
|--------------------|----------------------------|
| `/`               | HomePage                    |
| `/login`          | LoginPage                   |
| `/register`       | RegisterPage                |
| `/profile/consumer` | ConsumerProfilePage         |
| `/profile/winery` | WineryProfilePage           |
| `*`               | Not Found Page              |

## How it was created

To initialize the project, the following steps were followed:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/FSDSTR1024/TFM-frontend-rojo.git
    ```

2. **Create the project with Vite:**
    ```bash
    npm create vite@latest
    ```
    - **Framework:** React
    - **Variant:** JavaScript

3. **Install dependencies:**
    ```bash
    npm install
    ```

## Additional Installed Dependencies

### **[Moment.js](https://momentjs.com/)**

Used for date formatting in `Logger.jsx`.

```bash
npm install moment
```

### **[React Hook Form](https://www.react-hook-form.com/)**

Used for form handling and validation.

```bash
npm install react-hook-form
```

### **[React Router](https://reactrouter.com/)**

Used for dynamic navigation and routing.

```bash
npm install react-router-dom
```

## How to Contribute

If you want to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b new-feature
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Description of the change"
    ```
4. Submit a Pull Request.

If you have any questions, check the documentation before submitting changes.

---

 **Note:** If you find any errors or have suggestions, please open an *issue* on GitHub. 
