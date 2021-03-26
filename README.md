# Basketball App

Created by [Matthew Westenhaver](https://github.com/mattwestenhaver/).

You can view the deployed project [here](https://mw-basketball-app.herokuapp.com/).
(It is deployed on a free instance so it may take ~15 seconds to spin up)

## About

-   This project was created using React.js on the frontend and Node.js and express on the backend
-   Express.js serves both the client files and processes the API requests.

## Requirements

1. You will need Git, Node.js/NPM, and Yarn installed on your computer.

## How to Build

1. Fork the repository and then clone the repository to your local machine.
2. Using the command line, navigate to the root directory of the project.
3. Install the backend dependencies using Yarn - `yarn i`.
4. Navigate into the "client" directory and install the frontend dependencies using Yarn - `yarn i`.
5. If you want to keep the client and server together, you can use a service like Heroku.
6. If you want to split the client and server apart, you can use Heroku to deploy the server and a static hosting site like AWS S3 to host the production build of the client. The production build of the client can be created by running `yarn build` from the command line when in the root of the client directory.

## How to Run

1. Navigate into the root directory of the project and start the API using `node index.js` or `nodemon` if you have it installed.
2. Navigate into to the client directory in the command line and start the client using `yarn start`.
