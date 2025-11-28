This project automates the Purchase Flight user journey using Cypress.
It covers selecting departure/destination cities, choosing a flight, entering random user details, making a purchase, and validating final booking details.

Project Repository

GitHub Link:

1. Environment Setup

Follow these steps to run the project on your machine.

Prerequisites:

Make sure you have the following installed:

Node.js (v16+ recommended)
Download: https://nodejs.org/

npm (comes with Node.js)

Git
Download: https://git-scm.com/

2. Clone the Repository

Open a terminal and run:

git clone https://github.com/yourusername/flight-automation-cypress.git
cd flight-automation-cypress

3. Install Dependencies

Run: npm install

4. How to Run the Tests
Option A — Open Cypress UI
npx cypress open

Then click on:

E2E Testing → Chrome (or any browser) → purchaseEndToEnd.cy.js

Option B — Run Tests in Terminal
npx cypress run

This will execute all test cases in headless mode and generate console output.

5. Test Cases Covered
Test Case	Description
TC01	Boston → Berlin (Flight #2)
TC02	Random inputs for all parameters
TC03	Boston → Boston (Destination must NOT allow same city)
TC04	Invalid flight number = 0 (should throw error)
TC05	Custom values of your choice



