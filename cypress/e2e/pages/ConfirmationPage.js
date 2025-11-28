export class ConfirmationPage {

 verifyConfirmationPage() {
  // Accept ANY valid confirmation header BlazeDemo uses
  cy.contains('h1', 'Thank you for your purchase').should('be.visible');
}

  verifyBookingDetails() {
    cy.get('body').then(($body) => {

      const text = $body.text();

      // Match ANY format like: "Amount: 555 USD", "Amount: 555.20", etc.
      const amountMatch = text.match(/Amount[:\s]*([\d,]+(\.\d+)?)/i);

      // If no amount found, fail with readable message
      expect(amountMatch, "Amount not found on confirmation page").to.not.be.null;

      // Parse numeric value
      const amount = parseFloat(amountMatch[1].replace(/,/g, ''));

      // Validate
      expect(amount, "Purchase amount").to.be.a("number");
      expect(amount, "Amount should be greater than 100").to.be.greaterThan(100);
    });
  }
}
