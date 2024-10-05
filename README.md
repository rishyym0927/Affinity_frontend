# Affinity Frontend

Welcome to the Affinity Frontend repository! This project is a key component of the broader Affinity platform, focusing on frontend development. Affinity is a web application designed to connect individuals with similar intellectual capabilities. It features an AI-powered chatbot for matchmaking and offers various interactive games, including coding challenges, to align users based on their skillsets. Once matched, users can engage in meaningful conversations, fostering valuable intellectual connections.

If you're interested in working on the backend of our project, please head over to the following repository [Affinity Backend](https://github.com/Sidharth-Singh10/Affinity-backend).

<hr>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)
  
<br>
<hr class="dashed">
<br>

## Introduction

The Affinity Frontend is a React-based application designed to deliver a smooth and seamless user experience. This repository houses all the code related to the frontend portion of the Affinity project, and all contributions should be focused on this area. The frontend interacts with the backend through API calls to provide matchmaking services, games, and chat functionality for users.

<br>
<hr class="dashed">
<br>

## Features

- User-friendly interface
- Responsive design
- Integration with backend APIs
- Routing with React Router

<div height=132 width=850 style="display:flex justify-content:center align-items:center">
<span><img src="https://www.twaino.com/wp-content/uploads/2022/03/User-Friendly-1.png" alt="image unavailable" height="132" width="200" style="display:inline-block margin-right:20" >

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9qEJEvVSigE__4F96Ys1sglWD15XG5YYCkg&s" alt="image unavailable" height="132" width="200" style="display:inline-block margin-right:20 " >

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_r7wr9EcDQ0r3y_LrgKIVwCcx-79DjrrhmA&s" alt="image unavailable" height="132" width="200" style="display:inline-block  margin-right:20">

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfFtlM5l4pgeb61Ozn8gfzKmBmJN6xPeUWKQ&s" alt="image unavailable" height="132" width="200" style="display:inline-block margin-right:20" >
</span>
</div>

<br>
<hr class="dashed">
<br>

## Technologies Used

<div style="display:inline">• React <span><img src="https://pbs.twimg.com/profile_images/1785867863191932928/EpOqfO6d_400x400.png" alt="image not available" height="15" width="15"></span></div>
<div style="display:inline">• React Router <span><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs8eFjVYS6tWo9kjTBbsUa5Ti5FykMyI_yOg&s" alt="image not available" height="15" width="15"></span></div>
<div style="display:inline">• Axios <span><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBS_p5w9fZPPJhzhukYw_3QDUCUD5WjIzvGw&s" alt="image not available" height="14" width="15"></span></div>
<div style="display:inline">• CSS Modules<span><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaZF5M8yHb3xg0L13pj_g440Z9zQy7Bmb8vA&s" alt="image not available" height="15" width="15"></span></div>


<br>
<hr class="dashed">
<br>

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/rishyym0927/Affinity_frontend.git
    cd Affinity_frontend
    ```
    Cloning the repository creates a local copy of the project's files and history on your machine, allowing you to work on the code offline. This enables you to make changes, experiment, or contribute to the project without affecting the original repository until you push your updates.

   <br>
   
2. **Install dependencies:**

    ```bash
    npm install
    ```
    Installing dependencies retrieves and sets up the external libraries and packages required for the project to run properly. This ensures that all necessary tools and functionalities are available, allowing the application to function as intended.

   <br>

3. Even after running npm install, it may give an error while running that **"dotenv is not defined"**.
Simply run :

   ```bash
   npm install dotenv
   ```
   Now you can re-run the server and this time it will run without any error.
   
   >*Please note that you don’t need environment variables to run the project since no environment variables are currently being used in the codebase. The project contains only the frontend code and all the data has been hardcoaded. However, the requirement to install `dotenv` exists due to the boilerplate code present in the `vite.config.js`, which includes the `dotenv` configuration. Aside from this boilerplate setup, there is no practical need for `dotenv` in the project at the moment.*
   
   <br>
   

4. **Install dependencies:**

    ```bash
    npm install
    ```
    Installing dependencies retrieves and sets up the external libraries and packages required for the project to run properly. This ensures that all necessary tools and functionalities are available, allowing the application to function as intended.
   
    <br>
    
5. Even after running npm install, it may give an error while running that **"dotenv is not defined"**.
Simply run :

   ```bash
   npm install dotenv
   ```
   Now you can re-run the server and this time it will run without any error.
   
   >*Please note that you don’t need environment variables to run the project since no environment variables are currently being used in the codebase. The project contains only the frontend code and all the data has been hardcoaded. However, the requirement to install `dotenv` exists due to the boilerplate code present in the `vite.config.js`, which includes the `dotenv` configuration. Aside from this boilerplate setup, there is no practical need for `dotenv` in the project at the moment.*


<br>
<hr class="dashed">
<br>

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


> **Note**: Users are informed that they have the complete right to manipulate the sample data present in *sampleData.js*, as it is hardcoded. Any changes made will affect only your own codebase and will not impact others.

<hr class=dash>


### Routing

**Affinity** is still under development, so it currently lacks connectivity between its various pages; there are no buttons or links to direct you to other pages. However, you can access them by using  */* followed by *page-route*.

<br>

<table align="center">
  <tr>
    <th> Page Name </th>
    <th>Route</th>
  </tr>
  <tr>
    <td>Landing</td>
    <td>/</td>
  </tr>
  <tr>
    <td>Login</td>
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

<br>
<hr>
<br>

## Contributing

We welcome contributions from the community! Please read our [`CONTRIBUTING.md`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FLenovo%2FOneDrive%2FDesktop%2FPRACTISE%2Fdfsdfs%2FAffinity_frontend%2FCONTRIBUTING.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22e29a7936-4f33-4970-9e7f-3e2939a28627%22%5D "c:\Users\Lenovo\OneDrive\Desktop\PRACTISE\dfsdfs\Affinity_frontend\CONTRIBUTING.md") file for detailed guidelines on how to contribute to this project.

### Hacktoberfest and GSSoC 24

This repository is actively participating in Hacktoberfest and GSSoC 24. We welcome contributions, but please note that only frontend-related tasks are open for contribution. Any modifications or changes to the backend will not be considered. Feel free to raise issues and start working on assigned tasks.


<img src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Faz1y6x13r5cx5mo94yab.png" alt="HacktoberFest image" height="350px" width="890px" >

Hacktoberfest is an annual event that encourages developers to contribute to open-source projects throughout October. Participants can earn rewards, such as T-shirts and stickers, by submitting pull requests to eligible repositories, promoting collaboration and community engagement in the software development ecosystem.

<a href="https://hacktoberfest.com/" style="text-decoration:none"><button>Register for HacktoberFest!!</button>

<br>
<hr class="dashed-2">
<br>

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpyZ4geMITmskps7r06EpqS459o2WrXH6a_Q&s" alt="GSSoC image" height="200px" width="890px" >

GSSoC 24, or the Google Summer of Code 2024, is an initiative that offers stipends to university students for working on open-source projects during the summer. It aims to foster collaboration between students and open-source organizations, allowing students to gain practical experience while contributing to meaningful software development.

<a href="https://gssoc.girlscript.tech/registratio" style="text-decoration:none"><button>Register for GSSoC 24!!</button>


<br>
<hr class="dashed">
<br> 

## 📞 Contact

If you have any questions or need further assistance, feel free to open an issue or contact the maintainers.

Thank you for your contributions!


