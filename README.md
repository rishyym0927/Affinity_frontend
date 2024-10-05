# <i>Affinity Frontend</i>

<mark>Welcome to the Affinity Frontend repository! This project is part of the broader Affinity platform, focusing exclusively on frontend development</mark>. Affinity is a web application designed to connect individuals with similar intellectual levels. The platform utilizes an AI-powered chatbot for matchmaking and includes various interactive games, such as coding rounds, to match users based on their skillset. Once matched, users can engage in meaningful conversations with one another, fostering intellectual connections.
<img src="https://stadt-bremerhaven.de/wp-content/uploads/2020/03/Affinity-Suite.jpg" height="400px" width="700px">

### <i>Affinity's frontend is now open for open-source contributions as part of #Hacktoberfest.</i>

If you're interested in working on the backend of our project, please head over to the following repository [Affinity Backend](https://github.com/Sidharth-Singh10/Affinity-backend).

## <i>Table of Contents</i>

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## <i>Introduction</i>
<img src="https://tse4.mm.bing.net/th?id=OIP.rTIWX6QQXxjzI-2GqRzqFwHaEK&pid=Api&P=0&h=220" height="300px" width="400px">
<mark>The Affinity Frontend is a React-based application designed to deliver a smooth and seamless user experience</mark>. This repository houses all the code related to the frontend portion of the Affinity project, and all contributions should be focused on this area. The frontend interacts with the backend through API calls to provide matchmaking services, games, and chat functionality for users.

## <i><del>Features</del> <mark>BETTER FEATURES<sup>2</sup></mark></i>
<img src="https://i.ytimg.com/vi/XZNTeiiMm3w/maxresdefault.jpg" height="300px" width="400px">
- User-friendly interface
- Responsive design
- Integration with backend APIs
- Routing with React Router

## <i><mark>Technologies Used</mark></i>
<img src="https://knowworld365.com/wp-content/uploads/2021/10/frontend.png" height="200px" width="300px">
- React
<img src="https://miro.medium.com/v2/resize:fit:2560/0*ngqSFJgQ1fkpW_1Y" height="200px" width="300px">
- React Router
- Axios
<img src="https://tse4.mm.bing.net/th?id=OIP.DfXj70PID4YvRZAjXCr4RgHaEK&pid=Api&P=0&h=220" height="200px" width="300px">
- CSS Modules
<img src="https://k2bindia.com/wp-content/uploads/2015/08/React.png" height="200px" width="300px">
## Installation
<img src="https://tse4.mm.bing.net/th?id=OIP.oI98O_lbhPSFISB7ciN6tAHaDt&pid=Api&P=0&h=220" height="300px" width="400px">
To get started with the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/rishyym0927/Affinity_frontend.git
    cd Affinity_frontend
    ```

2. <font color="pink">Install dependencies</font>:

    ```bash
    npm install
    ```
3. Even after running npm install, it may give an error while running that "dotenv is not defined".
Simply run :

   ```bash
   npm install dotenv
   ```
   Now you can re-run the server and this time it will run without any error.
   
   >*Please note that you don’t need environment variables to run the project since no environment variables are currently being used in the codebase.<b>The project contains only the frontend code and all the data has been hardcoaded.</b>However, the requirement to install `dotenv` exists due to the boilerplate code present in the `vite.config.js`, which includes the `dotenv` configuration. Aside from this boilerplate setup, there is no practical need for `dotenv` in the project at the moment.*


## <i><mark>Usage</mark></i>
### Affinity now has role-based permissions for operations like generating an API key and exporting data via the API.
For ease of testing, we recommend starting out with an API key belonging to an Admin (or Enterprise Admin if your account is on the Enterprise tier).
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


> **Note**: Users are informed that they have the complete right to manipulate the sample data present in *sampleData.js*, as it is hardcoded. Any changes made will affect only your own codebase and will not impact others.

### <i><mark>Routing</mark></i>

<p style="background-color:pink;">**Affinity** is still under development so it lacks <del>connectivity</del> between its various pages hence there is no button or something kind of that can direct you to other pages. But you can access them by using a */* followed by *page-route*.</p>

<table align="center">
  <tr>
    <th> <i>Page Name</i> </th>
    <th>Route</th>
  </tr>
  <tr>
    <td><b>Landing</b></td>
    <td>/</td>
  </tr>
  <tr>
    <td><b>Login</b></td>
    <td>/login</td>
  </tr>
  <tr>
    <td>Register</td>
    <td>/register</td>
  </tr>
  <tr>
    <td>Room Page</td>
    <td>/room/:roomId</td>
  </tr>
  <tr>
    <td>Code Run</td>
    <td>/coderun</td>
  </tr>
  <tr>
    <td>Dashboard</td>
    <td>/dashboard</td>
  </tr>
  <tr>
    <td>Matches</td>
    <td>/matches</td>
  </tr>
  <tr>
    <td>Requests</td>
    <td>/request</td>
  </tr>
  <tr>
    <td>Queue</td>
    <td>/queue</td>
  </tr>
  <tr>
    <td>Chatbot</td>
    <td>/chatbot</td>
  </tr>
  <tr>
    <td>Denied</td>
    <td>/denied</td>
  </tr>
</table>


## <b><i>Contributing</i></b>
<img src="https://tse3.mm.bing.net/th?id=OIP.Hk30ycHrBD8nOdMmUyaxfgHaEK&pid=Api&P=0&h=220" height="300px" width="400px">

<b>We welcome contributions from the community! </b>Please read our [`CONTRIBUTING.md`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FLenovo%2FOneDrive%2FDesktop%2FPRACTISE%2Fdfsdfs%2FAffinity_frontend%2FCONTRIBUTING.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22e29a7936-4f33-4970-9e7f-3e2939a28627%22%5D "c:\Users\Lenovo\OneDrive\Desktop\PRACTISE\dfsdfs\Affinity_frontend\CONTRIBUTING.md") file for detailed guidelines on how to contribute to this project.

### <i>Hacktoberfest</i>
<img src="https://tse1.mm.bing.net/th?id=OIP.xIcnKy7Ava1qO6ECCl8ZZAAAAA&pid=Api&P=0&h=220" height="200px" width="300px">

#### This repository is actively participating in Hacktoberfest and GSSoC 24. We welcome contributions, but please note that only frontend-related tasks are open for contribution. Any modifications or changes to the backend will not be considered. Feel free to raise issues and start working on assigned tasks. Hacktoberfest is an annual event that takes place every October with a mission to get more people involved in open source. The event encourages everyone—coders and non-coders, regardless of skill level—to participate and make a positive impact on open-source.

### <i>GSSoC (2024)<i/>
<i>Google Summer of Code (GSoC) will be celebrating its 20th anniversary with our upcoming 2024 program.</i> Over the past 19 years we have welcomed over <del>5000</del>19,000 new contributors to open source through the program under the guidance of 19,000+ mentors from over 800 open source organizations in a wide range of fields.
<img src="https://tse1.mm.bing.net/th?id=OIP.Um2DfuwKA2lQw63AIq4TAwHaEZ&pid=Api&P=0&h=220" height="300px" width="400px">
## Contact

If you have any questions or need further assistance, feel free to open an issue or contact the maintainers.

<mark>Thank you for your contributions!</mark>


