
# <ins> Affinity Frontend</ins>

Welcome to the Affinity Frontend repository! This project is part of the broader Affinity platform, focusing exclusively on frontend development. Affinity is a web application designed to connect individuals with similar intellectual levels. The platform utilizes an AI-powered chatbot for matchmaking and includes various interactive games, such as coding rounds, to match users based on their skillset. Once matched, users can engage in meaningful conversations with one another, fostering intellectual connections.
<p align ="center"><img src="https://devtechnosys.ae/blog/wp-content/uploads/2021/10/Mean-Stack-Vs-Full-Stack-Developer.gif"> </p>
</br>
If you're interested in working on the backend of our project, please head over to the following repository [Affinity Backend](https://github.com/Sidharth-Singh10/Affinity-backend).

## <ins>Table of Contents</ins>

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

## <ins>Introduction</ins>

The Affinity Frontend is a React-based application designed to deliver a smooth and seamless user experience. This repository houses all the code related to the frontend portion of the Affinity project, and all contributions should be focused on this area. The frontend interacts with the backend through API calls to provide matchmaking services, games, and chat functionality for users.

## <ins>Features</ins>

- User-friendly interface 
- Responsive design 
- Integration with backend APIs 
- Routing with React Router

## <ins>Technologies Used</ins>

- React
- React Router
- Axios
- CSS Modules
- <img src="https://th.bing.com/th/id/OIP.-8o29F5iBnpv8cJVEd5AlQHaDt?w=304&h=174&c=7&r=0&o=5&dpr=1.3&pid=1.7" height="200px" width="300px" >

## <ins>Installation</ins>

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
3. Even after running npm install, it may give an error while running that "dotenv is not defined".
Simply run :

   ```bash
   npm install dotenv
   ```
   Now you can re-run the server and this time it will run without any error.
   
   >*Please note that you don’t need environment variables to run the project since no environment variables are currently being used in the codebase. The project contains only the frontend code and all the data has been hardcoaded. However, the requirement to install `dotenv` exists due to the boilerplate code present in the `vite.config.js`, which includes the `dotenv` configuration. Aside from this boilerplate setup, there is no practical need for `dotenv` in the project at the moment.*


## <ins>Usage</ins>

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

### Routing

**Affinity** is still under development so it lacks connectivity between its various pages hence there is no button or something kind of that can direct you to other pages. But you can access them by using a */* followed by *page-route*.

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


## <ins>Contributing</ins>

We welcome contributions from the community! Please read our [`CONTRIBUTING.md`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FLenovo%2FOneDrive%2FDesktop%2FPRACTISE%2Fdfsdfs%2FAffinity_frontend%2FCONTRIBUTING.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22e29a7936-4f33-4970-9e7f-3e2939a28627%22%5D "c:\Users\Lenovo\OneDrive\Desktop\PRACTISE\dfsdfs\Affinity_frontend\CONTRIBUTING.md") file for detailed guidelines on how to contribute to this project.

### Hacktoberfest and GSSoC 24

This repository is actively participating in Hacktoberfest and GSSoC 24. We welcome contributions, but please note that only frontend-related tasks are open for contribution. Any modifications or changes to the backend will not be considered. Feel free to raise issues and start working on assigned tasks.
</br>
<img src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_1080,q_100,w_1080/v1/gcs/platform-data-dsc/events/WhatsApp%20Image%202023-10-06%20at%2011.21.22_iKTNIXz.jpeg" height="300px" width="400px">
<img src="https://gssoc.girlscript.tech/Hero_Image_Lite_Theme.svg" height="300px" width="500px">

## <ins>Contact</ins>

If you have any questions or need further assistance, feel free to open an issue or contact the maintainers.

Thank you for your contributions!



