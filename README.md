# Library Management

Welcome to the Library Management project! This application is designed to simplify and automate the management of a library's operations, from cataloging books to managing borrowings. The backend is built with .NET 8, leveraging the latest features for a robust and scalable API. The frontend is developed using Angular 16, providing a modern and responsive user interface.

## Prerequisites

Before you can run the Library Management project on your local machine, you need to install several prerequisites. Ensure you have the following installed:

### For the Backend (.NET 8)

- **.NET 8 SDK**: The software development kit for building and running .NET applications. Download and install it from the [official .NET website](https://dotnet.microsoft.com/download).

### For the Frontend (Angular 16)

- **Node.js (v14.x or later)**: Angular 16 requires Node.js as its runtime environment. Download and install it from [nodejs.org](https://nodejs.org/).
- **npm (v6.x or later)**: npm is the package manager for JavaScript and is necessary to install Angular CLI and Angular project dependencies. npm is included with Node.js, so installing Node.js will also install npm.
- **Angular CLI (v16.x)**: The Angular CLI is a command-line interface tool used to initialize, develop, scaffold, and maintain Angular applications. Install it globally using npm with the following command:
npm install -g @angular/cli@16

## Setup Instructions

### Backend Setup

1. Open your terminal or command prompt.
2. Navigate to the root directory of the backend project (where the `.csproj` file is located).
3. Run the following command to restore the .NET dependencies:
dotnet restore
4. To build the project, run:
dotnet run
6. The backend API should now be running on `http://localhost:5000/` (or another port if configured differently).

### Frontend Setup

1. Open a new terminal or command prompt window.
2. Navigate to the `Source/Library.UI` directory, which contains the Angular project.
3. Run the following command to install the project dependencies:

npm install

4. Once the installation is complete, start the Angular development server with:
ng serve

5. The frontend application should now be accessible at `http://localhost:4200/`.

## Contributing

We welcome contributions to the Library Management project. If you're interested in helping, please read through our contributing guidelines before making a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file in the project root for more information.


