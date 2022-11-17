# Coderhouse Final Project

Welcome to my MERN stack project for the Coderhouse Full Stack Course. This repository is for the Backend part.

## Requirements

- [Node.js](https://nodejs.org/en/) version 16.14.2 or later
- You'll need to create a database using [Mongo Atlas](https://www.mongodb.com/atlas/database) beforehand

## Dependencies

- [Express.js](https://www.npmjs.com/package/express)
- [express-session](https://www.npmjs.com/package/express-session)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [multer](https://www.npmjs.com/package/multer)
- [connect-mongo](https://www.npmjs.com/package/connect-mongo)
- [passport](https://www.npmjs.com/package/passport) and [passport-local](https://www.npmjs.com/package/passport-local)
- [pino](https://www.npmjs.com/package/pino)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## Development Dependencies

- [eslint]()
- [nodemon]()
- [pino-pretty]()

## Installation

Download the project or clone the repository, then install the dependencies using npm intall in the root directory:

```bash
npm install
```

After intalling the dependencies you'll have to set a .env file the root directory with the following variables (for more information check [dotenv](https://www.npmjs.com/package/dotenv)):

- A variable to determine in what kind of eviroment the app will be running in.

```
NODE_ENV = Either "production" or "development"
```

- The rest of the variables needed will depend on the node enviroment
- For production the configuration will use:

```
PORT = The port where the server will be running
SECRET = The secret used by express session middleware
MONGOATLAS_URL = Your Mongo Atlas database Url
MAILER_EMAIL = The email used by nodemailer library
MAILER_EMAIL_PASS = The password of the mail above
```

- For development:

```
PORT_DEV = The port where the server will be running in development
SECRET_DEV = The secret used by express session middleware in development
MONGOATLAS_URL_DEV = Your Mongo Atlas database Url for development
MAILER_EMAIL_DEV = The email used by nodemailer library in development
MAILER_EMAIL_PASS_DEV = The password of the mail above
```

## Scripts

For running the aplication use:

```bash
npm start
```

For running the aplication in development mode (nodemon, pino-pretty) use:

```bash
npm run dev
```

For running the linter use:

```bash
npm run lint:check
```
