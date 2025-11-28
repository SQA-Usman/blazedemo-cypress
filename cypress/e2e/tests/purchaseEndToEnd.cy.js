import { HomePage } from "../pages/HomePage";
import { ReservePage } from "../pages/ReservePage";
import { PurchasePage } from "../pages/PurchasePage";
import { ConfirmationPage } from "../pages/ConfirmationPage";

const homePage = new HomePage();
const reservePage = new ReservePage();
const purchasePage = new PurchasePage();
const confirmationPage = new ConfirmationPage();

function purchaseEndToEnd(deptCity, destCity, flightSeq) {
  
  // ---- PARAMETER VALIDATION ---- //
  const departureCities = [
  "Paris",
  "Philadelphia",
  "Boston",
  "Portland",
  "San Diego",
  "Mexico City",
  "São Paolo"
];

const destinationCities = [
  "Buenos Aires",
  "Rome",
  "London",
  "Berlin",
  "New York",
  "Dublin",
  "Cairo",
  "Boston"
];


  // Validate departure
if (deptCity && !departureCities.includes(deptCity)) {
  throw new Error("Invalid departure city: " + deptCity);
}

// Validate destination
if (destCity && !destinationCities.includes(destCity)) {
  throw new Error("Invalid destination city: " + destCity);
}
  // ---- RANDOM VALUES IF MISSING ---- //
  const finalDept = deptCity || departureCities[Math.floor(Math.random() * departureCities.length)];
const finalDest = destCity || destinationCities[Math.floor(Math.random() * destinationCities.length)];
  const finalFlight = flightSeq || Math.floor(Math.random() * 3) + 1;

  cy.log("Selected Departure: " + finalDept);
  cy.log("Selected Destination: " + finalDest);
  cy.log("Selected Flight Sequence: " + finalFlight);

  // ---- TEST STEPS ---- //
  homePage.selectCities(finalDept, finalDest);
  homePage.clickFindFlights();

 reservePage.chooseFlightBySequence(finalFlight);

  purchasePage.fillUserDetailsAndPurchase();

  // ---- VALIDATIONS ---- //
  confirmationPage.verifyConfirmationPage();
}

describe("Purchase Flight Automation Assessment", () => {

  it("Test Case 1: Boston → Berlin, Flight 2", () => {
    purchaseEndToEnd("Boston", "Berlin", 2);
  });

  it("Test Case 2: All random values", () => {
    purchaseEndToEnd();
  });

 it("Test Case 3: - Boston to Boston (Destination should NOT allow Boston)", () => {
  const deptCity = "Boston";
  const destCity = "Boston";

  //  Visit Home Page
  cy.visit("https://blazedemo.com");

  cy.log("Selecting departure city: " + deptCity);
  cy.get('select[name="fromPort"]').select(deptCity);

  cy.log("Checking destination dropdown does NOT contain Boston");
  cy.get('select[name="toPort"] option').should('not.contain.text', destCity);

  cy.log("Validating Boston truly does NOT exist in destination list");
  cy.get('select[name="toPort"]').then($dropdown => {
    const hasBoston = [...$dropdown.find('option')].some(opt => opt.text === destCity);
    expect(hasBoston, "Boston should NOT exist in destination dropdown").to.be.false;
  });
});

  it("Test Case 4: Invalid flight number 0 → Should throw error", () => {
  cy.visit("https://blazedemo.com");

  // Select valid input so the flights page loads
  cy.get('select[name="fromPort"]').select("Paris");
  cy.get('select[name="toPort"]').select("Berlin");
  cy.contains("Find Flights").click();

  cy.log("Now testing invalid flight selection");

  const reservePage = new ReservePage();

  cy.on("fail", (err) => {
    expect(err.message).to.include("Invalid flight sequence");
    return false; // prevent test from stopping early
  });

  reservePage.chooseFlightBySequence(0); //  Should throw
});
it("Test Case 5: Custom input", () => {
    purchaseEndToEnd("Paris", "Buenos Aires", 1);
  });

});
