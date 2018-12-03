# MERN Stack Boilerplate

## Node, Express, React, MongoDB

- Get your project started in no time with Node, Express, React, Redux, m-lab, Google Auth authentication, Passport local strategy authentication, Sass/SCSS styling, Mongoose Schemas, Jest & Enzyme unit testing, Heroku deployment and more.

### Technologies:

1. Server Side
   - NodeJS
   - ExpressJS
   - PassportJS (Authentication)
   - OAuth2
   - JWT
   - bcryptjs (for hashing passwords)
1. Client Side

   - ReactJS
   - Redux
   - Webpack
   - Babel
   - Axios
   - Sass
   - BootStrap 4
   - jQuery
   - Font Awesome (React Package)

1. Database

   - MongoDB
   - MongooseJS
   - m-Lab

1. Test
   - Jest
   - Enzyme
   - React Test Renderer

---

### Server Configuration:

1. Proxy :
   - use "proxy": "http://localhost:5555", in 'package.json', making sure that the port = the backend server's port

### Installation

1. Install [Node](https://nodejs.org/en/)

1. Clone this REPO

   ```bash
   git clone https://github.com/a-soliman/MERN-boilerplate.git
   ```

   ```bash
   cd MERN-Boilerplate/
   ```

1. Install the required packges

   Run 'npm install' or 'npm i' to install the required packages.

   ```bash
   npm install
   ```

1. Create and fill the keys file in /server/config/keys.js

```
module.exports = {
  mongoURI: MONGODB DATABASE URL (LOCAL OR IN M-LAB),
  secretOrKey: SECRET STRING,
  googleClientId: GOOGLE CLIENT ID (FROM GOOGLE CONSOLE) FOR GOOGLE AUTHENTICATION,
  googleClientSecret: GOOGLE CLIENT SECRET (FROM GOOGLE CONSOLE) FOR GOOGLE AUTHENTICATION,
  googleCallbackURL: GOOGLE CALLBACK URL (FROM GOOGLE CONSOLE) FOR GOOGLE AUTHENTICATION,
  defaultGooglePassword: SOME DUMMY PASSWORD HERE
};

```

---

### Deployment

#### Heroku:

- This boilerplate is configured to run at Heroku with no need for further configuration.

1. Go through the traditional [Heroku-Cli setup](https://devcenter.heroku.com/articles/heroku-cli).
2. At the root level of the project
   ```
   heroku create
   ```
3. push to Heroku
   ```
   git push heroku master
   ```

---

### Running the Dev Server:

1. Combined Front-End & Back-End Server

   - Runs 2 servers (Express and Webpack) in one terminal window using [concurrently](https://www.npmjs.com/package/concurrently)

   ```bash
   npm run dev-server
   ```

   - Open your browser at port 8080 => [http://localhost:8080](http://localhost:8080)

1. Front-End Server (Webpack)

   ```bash
    npm run dev-server:client
   ```

   - Open your browser at port 8080 => [http://localhost:8080](http://localhost:8080)

1. Back-End Server (Nodemon)

   ```bash
   npm run dev-server:server
   ```

   - Check your console, Port 5555 must be vacated

1. Unit Testing Server (Jest, Enzyme)
   ```bash
   npm run test
   ```

## API END-POINTS:

### USERS : /api/users

- POST /register
- POST /login
- GET /google
- GET /google/redirect
- GET /current

---

## Third party Packages Usage Examples :

1. Font Awesome (React Package)

```
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Food = () => (
<div>
    Favorite Food: <FontAwesomeIcon icon="stroopwafel" />
</div>
)
```

---

## Next Steps:

1. Add Node-mailer
2. Add further 3rd party Authentication (Facebook, Twitter, Github, LinkedIn and Amazon).
