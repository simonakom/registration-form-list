# <span><img src="./form.png" alt=registration style="height: 1em; vertical-align: middle;"></span>  Registration form

This assignment is about creating simple registration form and displaying registered poeple using html, css, javascript. Also, testing the registration form with cypress.

<h4>🔹 Check the registration form here - <a href="https://simonakom.github.io/registration-form-list/registration.html" style="font-size:small;">View</a><h4>


## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js: [Download here](https://nodejs.org/).
- npm (Node Package Manager): Comes with Node.js installation.


## Setup a local HTTP server

- Install 'package.json': `npm init -y`.
- Install the 'http-server' packgae: `npm install http-server -D`.
- Add a new script to 'package.json': 

````
  "scripts": {
     "dev": "http-server"
  }
````

- Run: `npm run dev`. Once the server starts, it will serve project files from the root directory over the default port 8080.

- To access the registration form app, choose suggested endpoint and append `/registration.html` to the URL like this: http://127.0.0.1:8080/registration.html. This endpoint will be used to test with Cypress.

## Set up of Cypress

- Install Cypress library: `npm install cypress -D`.
- Add a new test script to 'package.json': 

````
  "scripts": {
     "dev": "http-server",
     "test": "npx cypress open"
  }
````
- To run and open 'Cypress':  `npm run test`.

- In Cypress UI choose E2E Testing in preffered browser and create new `spec` or choose existing `spec`. 
- You should find a test file in code editor: `cypress/e2e/fileName.cy.js`.

## Run

- Open one terminal window and run the app -> `npm run dev`.
- Open another terminal window and execute the test script -> `npm run test`


