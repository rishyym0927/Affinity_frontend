# ***Affinity Frontend*** 
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ5k-L-255aMJvb205-BlnynmwDy6R9PqP8A&s" width="200">


 Welcome to the Affinity Frontend repository.
 
This project constitutes a crucial component of the broader Affinity platform, which is exclusively focused on frontend development. Affinity is a web application designed to connect individuals who possess similar intellectual levels.

**Key features:**
1. AI-powered chatbot
2. Interactive games
3. Meaningful conversations

If you're interested in working on the backend of our project, please head over to the following repository [Affinity Backend](https://github.com/Sidharth-Singh10/Affinity-backend).

## ***Table of Contents***

▶️ [Introduction](#introduction)  

▶️ [Features](#features)

▶️ [Technologies Used](#technologies-used)

▶️ [Installation](#installation)

▶️ [Usage](#usage)

▶️ [Contributing](#contributing)

▶️ [Contact](#contact)

## ***Introduction***
The Affinity Frontend is a React-based application engineered to provide an intuitive and seamless user experience. This repository contains all code pertinent to the frontend component of the Affinity project. Contributions should be exclusively directed toward this area.

The frontend seamlessly interacts with the backend via API calls, facilitating matchmaking services, game interactions, and chat functionalities for users.

## ***Features***

▶️ **User-friendly interface**

 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc9IVXq6zMJlw0XechoTc84ydVoMZy8R97ZQ&s" width="300">   
   
▶️ **Responsive design**

  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkqrx6TDBJZGCWeDQ_yyZLm8ROQht23FbdPhj03OhxygfveK2pIXjWAqJZqcEZzTcC_D8&usqp=CAU" width="300">     
                                                                        
▶️ **Integration with backend APIs**

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREc8ZZqwhiNFzzrTx6HZRCOUsbLE49WvOqcw&s" width="300">

▶️ **Routing with React Router**

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbXCTgGOTDpaBE4NBsIUsQHdhX4mCVja79IA&s" width="250">
                                            

                                              
                                               
## ***Technologies Used***

<div display:flex; justify-content:centre; align-items:centre>
 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzNqu78mFEqc32bPy8kSwwvHBGya1sUM16EQ&s" width="200"> 
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbXCTgGOTDpaBE4NBsIUsQHdhX4mCVja79IA&s" width="150">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwj6VDs-GlKpaiYOAgw6zBclIQCgMnBpiELhrSLeyEgAa8S9sv9WBIWospyDXWE3TzxWQ&usqp=CAU" width="200">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz22ctgPNEtRFFMnTgF2xdOr4qDEeYL7NYOw&s" width="200">
</div>

## Installation<img src="https://static.vecteezy.com/system/resources/previews/006/961/138/non_2x/wrench-repair-with-gear-wheel-surrounding-logo-free-vector.jpg" width="50">

To get started with the project, follow these steps:

**1. Clone the repository:** This command downloads the code from the GitHub repository to your local machine.

    ```bash
    git clone https://github.com/rishyym0927/Affinity_frontend.git
    cd Affinity_frontend
    ```

**2. Install dependencies:** This command installs all the required packages listed in the package.json file for the project.

    ```bash
    npm install
    ```
**3. Even after running npm install, it may give an error while running that "dotenv is not defined".
Simply run:**

   ```bash
   npm install dotenv
   ```
   Now you can re-run the server and this time it will run without any error.
   
  🔴**Important Note:**

You do not need environment variables to run this project, as the codebase does not currently utilize any environment variables. The project consists solely of frontend code, with all necessary data hardcoded.

The requirement to install dotenv arises from the boilerplate configuration present in vite.config.js, which includes the dotenv setup. However, aside from this boilerplate configuration, there is no practical need for dotenv in the project at this time.




## ***Usage***<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHJQ8UpomV8Fd7JDlFCTKGtHfduPd3lu9XxQ&s" width="50">

To run the application locally, use the following command:

```bash
npm start
```

This will start the development server and you can view the application in your browser at `http://localhost:5173`.



- **public/**: Contains static files that are publicly accessible. This includes images, favicon, and other assets that do not require processing by the build 
               system.
- **src/**: This is where the main source code for your application resides. It includes everything needed for your app to function.


- **assets/**: Contains images, fonts, and other static assets used throughout your application.
- **components/**: Reusable React components that can be used throughout your application. Components are modular pieces of UI that can be shared.
- **pages/**: Contains React components that correspond to different pages of your application. Each page may consist of one or more components from the 
              components directory.
- **App.js**: Main App component that serves as the root of your React application. It typically includes the routing logic and layout structure.
- **index.js**: Entry point of the application. It renders the App component and connects the application to the DOM.

🔴**Important Note**:

Users are encouraged to modify the hardcoded sample data in sampleData.js. Any changes will only affect your local codebase and will not impact others.

### ***Routing***<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdzcaR-tLXqr_WJDudSHrvzOcQFWDosxi8A&s" width="50">

**Affinity** is still under development so it lacks connectivity between its various pages hence there is no button or something kind of that can direct you to other pages. But you can access them by using a */* followed by *page-route*.

<table align="center" style="border-collapse: collapse; width: 80%; margin: 20px auto;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th style="border: 1px solid #dddddd; padding: 8px; text-align: left;">Page Name</th>
      <th style="border: 1px solid #dddddd; padding: 8px; text-align: left;">Route</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #ffffff;">
      <td style="border: 1px solid #dddddd; padding: 8px;">Landing</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">/</td>
    </tr>
    <tr style="background-color: #f9f9f9;">
      <td style="border: 1px solid #dddddd; padding: 8px;">Login</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">/login</td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td style="border: 1px solid #dddddd; padding: 8px;">Register</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">/register</td>
    </tr>
    <tr style="background-color: #f9f9f9;">
      <td style="border: 1px solid #dddddd; padding: 8px;">Room Page</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">/room/:roomId</td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td style="border: 1px solid #dddddd; padding: 8px;">Code Run</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">/coderun</td>
    </tr>
    <tr style="background-color: #f9f9f9;">
      <td style="border: 1px solid #dddddd; padding: 8px;">Dashboard</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">/dashboard</td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td style="border: 1px solid #dddddd; padding: 8px;">Matches</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">/matches</td>
    </tr>
    <tr style="background-color: #f9f9f9;">
      <td style="border: 1px solid #dddddd; padding: 8px;">Requests</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">/request</td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td style="border: 1px solid #dddddd; padding: 8px;">Queue</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">/queue</td>
    </tr>
    <tr style="background-color: #f9f9f9;">
      <td style="border: 1px solid #dddddd; padding: 8px;">Chatbot</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">/chatbot</td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td style="border: 1px solid #dddddd; padding: 8px;">Denied</td>
      <td style="border: 1px solid #dddddd; padding: 8px;">/denied</td>
    </tr>
  </tbody>
</table>


## ***Contributing***<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0WvdPFRXatoSUICMV56cGkIhUGMjWecPDvA&s" width="50">

We welcome contributions from the community! 

<img src="https://avatars.githubusercontent.com/u/136720020?v=4" width="30"> https://github.com/rishyym0927

<img src="https://avatars.githubusercontent.com/u/70999945?v=4" width="30"> https://github.com/Sidharth-Singh10

<img src="https://avatars.githubusercontent.com/u/75424966?v=4" width="30">https://github.com/Kp779

<img src="https://avatars.githubusercontent.com/u/143862235?v=4" width="30">https://github.com/AMANVISHWAKARMA27

<img src="https://avatars.githubusercontent.com/u/148557891?v=4" width="30">https://github.com/pavithrakumar22

<img src="https://avatars.githubusercontent.com/u/80642297?v=4" width="30">https://github.com/mahendra3399

<img src="https://avatars.githubusercontent.com/u/170428995?v=4" width="30">https://github.com/kartikey369-ind

<img src="https://avatars.githubusercontent.com/u/123247713?v=4" width="30">https://github.com/Anshul-Sharma01


Please read our [`CONTRIBUTING.md`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FLenovo%2FOneDrive%2FDesktop%2FPRACTISE%2Fdfsdfs%2FAffinity_frontend%2FCONTRIBUTING.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22e29a7936-4f33-4970-9e7f-3e2939a28627%22%5D "c:\Users\Lenovo\OneDrive\Desktop\PRACTISE\dfsdfs\Affinity_frontend\CONTRIBUTING.md") file for detailed guidelines on how to contribute to this project.

### 👉 ***Hacktoberfest and GSSoC 24***

This repository is actively participating in Hacktoberfest and GSSoC 24. We welcome contributions, but please note that only frontend-related tasks are open for contribution. Any modifications or changes to the backend will not be considered. Feel free to raise issues and start working on assigned tasks.


## 📞***Contact***

If you have any questions or need further assistance, feel free to open an issue or contact the maintainers.

Thank you for your contributions! 
