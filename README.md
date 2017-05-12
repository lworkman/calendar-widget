This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Basic event widget created by Liam Workman. On desktop it's a widget, while on mobile it's a full page app.

## Test environment

There are two different node.js instances in here, so you will need to run:

`npm install`

On the top level and then run:

`cd ./client/`
`npm install`

While in testing, the app uses "concurrently" to run two node commands. You'll need to install it:

`npm install -g concurrently`

Once done, you can run the test environment by navigating to the top leve directory and running the command:

`npm start`

## Build

You can build the app by navigating into the client directory and running the command:

`npm build`

However, to access the API endpoint you will need to make sure that the server is running,
and that you're accessing the react index from the localhost.

To run the server, navigate to the top level and run:

`node server.js`

Then head to the `http://localhost:3001`.