# <span><img src="./form.png" alt=registration style="height: 1em; vertical-align: middle;"></span>  Registration form

This project is about creating simple registration form using html, css, javascript and testing it with automated tests using Cypress.

<h4>🔹 Check the registration form here - <a href="https://simonakom.github.io/registration-form-list/registration.html" style="font-size:small;">View</a><h4>


## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js: [Download here](https://nodejs.org/).
- npm (Node Package Manager): Comes with Node.js installation.

## Set up 

1. Clone this repository to your local machine.
2. Navigate to the project directory.
4. Install dependencies: `npm install`.

## Run a local HTTP server

- Run: `npm run dev`. Once the server starts, it will serve project files from the root directory over the default port 8080.

- To access the registration form app, choose suggested endpoint and append `/registration.html` to the URL like this: http://127.0.0.1:8080/registration.html. This endpoint will be used to test with Cypress.

## Run Cypress

- To run and open 'Cypress' user interface (GUI):  `npm run test`. 
  - In Cypress UI choose E2E Testing in preffered browser and choose existing "spec": `testsWithCommands.cy.js` or `testsWithFunctions.cy.js`.
- To run Cypress tests in your terminal or command line interface (CLI): `npm run test:cmd`. 

## Run local HTTP server & Cypress

- Open one terminal window and run the app: `npm run dev`.
- Open another terminal window and execute the test script: `npm run test` or `npm run test:cmd`. 

## Automated tests with Cypress

- Tests with functions can be found: `cypress/e2e/testsWithFunctions.cy.js`.
- Tests with commands can be found: `cypress/e2e/testsWithCommands.cy.js`.
  - Commands can be found: `cypress/support/commands.js`.
