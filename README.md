


# Affinity Frontend

Welcome to the Affinity Frontend repository! This project is part of the Affinity application, focusing on the frontend development.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Affinity Frontend is a React-based frontend application designed to provide a seamless user experience. This repository is dedicated to the frontend part of the project, and contributions should be limited to this area.

## Features

- User-friendly interface
- Responsive design
- Integration with backend APIs
- State management with Redux
- Routing with React Router

## Technologies Used

- React
- Redux
- React Router
- Axios
- CSS Modules
- Jest (for testing)

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/rishyym0927/Affinity_frontend.git
    cd Affinity_frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

To run the application locally, use the following command:

```bash
npm start
```

This will start the development server and you can view the application in your browser at `http://localhost:5173`.



- **public/**: Contains the static files.
- **src/**: Contains the source code for the application.
  - **assets/**: Contains images, fonts, and other static assets.
  - **components/**: Contains reusable React components.
  - **pages/**: Contains React components for different pages.
  - **App.js**: The main App component.
  - **index.js**: The entry point of the application.

## Environment Variables

While this project supports the use of environment variables (typically stored in a .env file), it is not required to set them up to run the project. You can proceed without configuring any environment variables. 

## Routing

The application uses React Router for navigation. You can freely access different pages by using the following routes:

- `/`: Home page (Landing component)
- `/login`: Login page (Login component)
- `/register`: Register page (Register component)
- `/room/:roomId`: Room page (RoomPage component) - accessible based on the room ID.
- `/coderun`: CodeRun page - restricted, only accessible if the user is authenticated; otherwise redirects to the landing page.
- `/dashboard`: Dashboard page - restricted, only accessible to users whose gender is not "Male"; otherwise redirects to the landing page.
- `/matches`: Matches page - restricted, only accessible if the user is authenticated; otherwise redirects to the landing page.
- `/request`: Requests page - restricted, only accessible to users whose gender is not "Female"; otherwise redirects to the landing page.
- `/queue`: Queue page - restricted, only accessible to users whose gender is "Female"; otherwise redirects to the landing page.
- `/chatbot`: Chatbot page - accessible only if the user is authenticated; otherwise redirects to the landing page.


Feel free to explore and navigate the project using the URLs.

## Data Manipulation

Users have complete freedom to manipulate the sample data provided in the project. The sample data files can be found in the `/` directory.

## Contributing

We welcome contributions from the community! Please read our [`CONTRIBUTING.md`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FLenovo%2FOneDrive%2FDesktop%2FPRACTISE%2Fdfsdfs%2FAffinity_frontend%2FCONTRIBUTING.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22e29a7936-4f33-4970-9e7f-3e2939a28627%22%5D "c:\Users\Lenovo\OneDrive\Desktop\PRACTISE\dfsdfs\Affinity_frontend\CONTRIBUTING.md") file for detailed guidelines on how to contribute to this project.

### Hacktoberfest and GSSoC 24

We are participating in Hacktoberfest and GSSoC 24. Contributions are welcome for the frontend part of the project only. Please do not make changes to the backend.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

If you have any questions or need further assistance, feel free to open an issue or contact the maintainers.

Thank you for your contributions!
```

