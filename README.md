<div>
    
![____Affinity_Frontend____Bridging_Minds_through_Intellectual_Connections](https://github.com/user-attachments/assets/1a933002-927c-4f32-8865-96eda7ba8cd1)

</div>


Welcome to the Affinity Frontend project, the cornerstone of the Affinity platform. This innovative web application is dedicated to fostering meaningful connections between individuals who share a common intellectual curiosity. Leveraging the power of AI-driven matchmaking and engaging interactive games, Affinity facilitates the discovery of like-minded individuals. By engaging in stimulating conversations and collaborative problem-solving, users can expand their intellectual horizons and form lasting bonds.

If you're interested in working on the backend of our project, please head over to the following repository [Affinity Backend](https://github.com/Sidharth-Singh10/Affinity-backend).
<head></head>

## ***Table of Contents***🔎



👉[Introduction](#introduction)

👉[Features](#features)

👉[Technologies Used](#technologies-used)

👉[Installation](#installation)

👉[Usage](#usage)

👉[Contributing](#contributing)

👉[Contact](#contact)

## ***Introduction***🌟

The Affinity Frontend is a meticulously crafted React-based application designed to provide a seamless and intuitive user experience. This repository serves as the central hub for all frontend-related code within the Affinity project. Contributions are exclusively focused on enhancing the frontend's interface, ensuring a delightful user journey. The frontend seamlessly interacts with the backend through well-defined API calls, enabling matchmaking, engaging games, and robust chat functionality for users.

## ***Features***⚡

- User-friendly interface <p><img src="https://natasalagou.com/wp-content/uploads/2021/09/natasa-lagou-blog-user-friendly-website.jpg" style="height:200px; width:400px; border-radius:10px;"></p>
- Responsive design <p><img src="https://www.infront.com/wp-content/uploads/2019/10/responsive-websites-700-1.jpg" style="height:200px; width:400px; border-radius:10px;"></p>
- Integration with backend APIs <p><img src="https://www.datocms-assets.com/48401/1627660998-api-diagram.png?fit=max&w=900" style="height:200px; width:400px; border-radius:10px;"></p>
- Routing with React Router <p><img src="https://blog.openreplay.com/images/understanding-react-router-with-a-simple-blog-application/images/hero.png" style="height:200px; width:400px; border-radius:10px;"></p>

## ***Technologies Used***💻
![TheDoctorLeoFitzGIF](https://github.com/user-attachments/assets/5ddff4e2-108d-49eb-938f-adb172a38a55)


- <p style="font-family:cursive; font-weight:bold;">React <img src="https://cdn.iconscout.com/icon/free/png-256/free-react-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-4-pack-icons-282599.png?f=webp&w=256" style="height:20px ; width:20px;"></p>
- <p style="font-family:cursive; font-weight:bold;">React Router <img src="https://i.ytimg.com/vi/SAWswqOjD2U/hqdefault.jpg" style="height:20px; width:20px;"></p>
- <p>Axios <img src="https://blog.openreplay.com/images/integrating-axios-with-react-hooks/images/hero.png" style="height:20px; width:20px;"></p>
- <p>CSS Modules <img src="https://png.pngtree.com/png-vector/20220520/ourlarge/pngtree-coding-language-css-system-vector-isometric-sign-png-image_4687821.png" style="height:20px; width:20px;"></p>
<div style="display:inline-block; margin:50px;"> <img src="https://cdn.iconscout.com/icon/free/png-256/free-react-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-4-pack-icons-282599.png?f=webp&w=256" style="height:100px ; width:100px;"><img src="https://i.ytimg.com/vi/SAWswqOjD2U/hqdefault.jpg" style="height:100px ; width:100px;"> <img src="https://blog.openreplay.com/images/integrating-axios-with-react-hooks/images/hero.png" style="height:100px ; width:100px;"> <img src="https://png.pngtree.com/png-vector/20220520/ourlarge/pngtree-coding-language-css-system-vector-isometric-sign-png-image_4687821.png" style="height:100px ; width:100px;"></div>



## ***Installation***🔧

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


## ***Usage***⚙

To run the application locally, use the following command:

```bash
npm start
```

This will start the development server and you can view the application in your browser at `http://localhost:5173`.



- [**public/**](./public/): Contains the static files.
- [**src/**](./src/): Contains the source code for the application.
  - [**assets/**](./src/assets/): Contains images, fonts, and other static assets.
  - [**components/**](./src/components/): Contains reusable React components.
  - [**pages/**](./src/pages/): Contains React components for different pages.
  - [**App.js**](./src/App.js/): The main App component.
  - [**index.js**](./src/index.js/): The entry point of the application.


> **Note**: Users are informed that they have the complete right to manipulate the sample data present in *sampleData.js*, as it is hardcoded. Any changes made will affect only your own codebase and will not impact others.

### ***Routing***⚙

**The Affinity** is currently in development, and as such, there may be limitations in navigation between pages. While buttons or direct links may not be available at this time, But you can access them by using a / followed by page-route.

<table align="center" border="1" style="border-collapse: collapse; width: 100%; border: 2px solid #ccc;">
  <thead>
    <tr>
      <th style="text-align: center; padding: 10px;">Page Name</th>
      <th style="text-align: center; padding: 10px;">Route</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: center; padding: 10px;">Landing</td>
      <td style="text-align: center; padding: 10px;">/</td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 10px;">Login</td>
      <td style="text-align: center; padding: 10px;">/login</td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 10px;">Register</td>
      <td style="text-align: center; padding: 10px;">/register</td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 10px;">Room Page</td>
      <td style="text-align: center; padding: 10px;">/room/:roomId</td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 10px;">Code Run</td>
      <td style="text-align: center; padding: 10px;">/coderun</td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 10px;">Dashboard</td>
      <td style="text-align: center; padding: 10px;">/dashboard</td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 10px;">Matches</td>
      <td style="text-align: center; padding: 10px;">/matches</td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 10px;">Requests</td>
      <td style="text-align: center; padding: 10px;">/request</td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 10px;">Queue</td>
      <td style="text-align: center; padding: 10px;">/queue</td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 10px;">Chatbot</td>
      <td style="text-align: center; padding: 10px;">/chatbot</td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 10px;">Denied</td>
      <td style="text-align: center; padding: 10px;">/denied</td>
    </tr>
  </tbody>
</table>


# ***Contributing***✨

We welcome contributions from the community! Please read our [`CONTRIBUTING.md`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FLenovo%2FOneDrive%2FDesktop%2FPRACTISE%2Fdfsdfs%2FAffinity_frontend%2FCONTRIBUTING.md%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22e29a7936-4f33-4970-9e7f-3e2939a28627%22%5D "c:\Users\Lenovo\OneDrive\Desktop\PRACTISE\dfsdfs\Affinity_frontend\CONTRIBUTING.md") file for detailed guidelines on how to contribute to this project.
## Contributors🤝

- <p><img src="https://avatars.githubusercontent.com/u/136720020?v=4" style="height:50px; width:50px"> <a 
  href="https://github.com/rishyym0927">RISHIRAJ MUKHERJEE</a>
  </p>
- <p><img src="https://avatars.githubusercontent.com/u/70999945?v=4" style="height:50px; width:50px"> <a 
  href="https://github.com/Sidharth-Singh10">SIDDHART SINGH</a></p> 
- <p><img src="https://avatars.githubusercontent.com/u/75424966?v=4" style="height:50px; width:50px"> <a 
  href="https://github.com/Kp779">KOMPAL POORKAR</a></p>
- <p><img src="https://avatars.githubusercontent.com/u/143862235?v=4" style="height:50px; width:50px"> <a 
  href="https://github.com/AMANVISHWAKARMA27">AMAN VISHWAKARMA</a></p>
- <p><img src="https://avatars.githubusercontent.com/u/148557891?v=4" style="height:50px; width:50px"> <a 
  href="https://github.com/pavithrakumar22">PAVITHRA KUMAR</a></p>
- <p><img src="https://avatars.githubusercontent.com/u/80642297?v=4" style="height:50px; width:50px"> <a 
  href="https://github.com/mahendra3399">MAHENDRA</a></p>
- <p><img src="https://avatars.githubusercontent.com/u/170428995?v=4" style="height:50px; width:50px"> <a 
  href="https://github.com/kartikey369-ind">KARTIKEY</a></p>
- <p><img src="https://avatars.githubusercontent.com/u/123247713?v=4" style="height:50px; width:50px"> <a 
  href="https://github.com/Anshul-Sharma01">ANSHUL SHARMA</a></p>





<h2>Hactoberfest <img src="https://raw.githubusercontent.com/github/explore/e838e6d3526495c83c195ed234acf109cb781f00/topics/hacktoberfest/hacktoberfest.png" style="height:20px; width:20px;"> and GSSoC '24 <img src="https://user-images.githubusercontent.com/63473496/153487849-4f094c16-d21c-463e-9971-98a8af7ba372.png" style="height:30px; width:30px;"></h2>

This repository is actively participating in Hacktoberfest and GSSoC 24. We welcome contributions, but please note that only frontend-related tasks are open for contribution. Any modifications or changes to the backend will not be considered. Feel free to raise issues and start working on assigned tasks.

## Contact📞
If you have any questions or need further assistance, feel free to open an issue or contact the maintainers.

Thank you for your contributions!


