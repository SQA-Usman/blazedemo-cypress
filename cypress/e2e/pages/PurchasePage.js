// cypress/e2e/pages/purchasePage.js

export class PurchasePage {

  /**
   * Fill the purchase form with deterministic dummy data and submit.
   * Keeps fields simple so tests are predictable.
   */
  fillUserDetailsAndPurchase() {
    // Passenger info
    cy.get('input[name="inputName"]').clear().type('John Doe');
    cy.get('input[name="address"]').clear().type('123 Main St');
    cy.get('input[name="city"]').clear().type('Cityville');
    cy.get('input[name="state"]').clear().type('Statefield');
    cy.get('input[name="zipCode"]').clear().type('12345');

    // Payment info
    cy.get('select[name="cardType"]').select('Visa');
    cy.get('input[name="creditCardNumber"]').clear().type('4111111111111111');
    // month & year fields sometimes have default values; clear then type
    cy.get('input[name="creditCardMonth"]').clear().type('12');
    cy.get('input[name="creditCardYear"]').clear().type('2028');
    cy.get('input[name="nameOnCard"]').clear().type('John Doe');

    // Uncheck remember me if present
    cy.get('input[name="rememberMe"]').then(($el) => {
      if ($el && $el.length) {
        cy.wrap($el).uncheck({ force: true });
      }
    });

    // Submit purchase
    cy.contains('Purchase Flight').click();
  }

}

export const purchasePage = new PurchasePage();
