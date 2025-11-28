export class HomePage {

  selectCities(deptCity, destCity) {
    cy.visit("https://blazedemo.com");

    cy.get('select[name="fromPort"]').select(deptCity);
    cy.get('select[name="toPort"]').select(destCity);
  }

  clickFindFlights() {
    cy.get('input[type="submit"]').click();
  }

}
