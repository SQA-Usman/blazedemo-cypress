export class ReservePage {

  chooseFlightBySequence(sequenceNumber) {

    cy.get('table.table tbody tr').then((rows) => {

      if (rows.length === 0) {
        throw new Error("No flights found on the Reserve page.");
      }

      if (sequenceNumber < 1 || sequenceNumber > rows.length) {
        throw new Error(`Invalid flight sequence: ${sequenceNumber}. Available flights: ${rows.length}`);
      }

      cy.wrap(rows[sequenceNumber - 1])
        .find('input[type="submit"]')
        .click();
    });
  }
}
