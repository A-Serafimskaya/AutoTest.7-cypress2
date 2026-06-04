describe("booking movie", () => {
  it("Should possible to book2 ", () => {
    const accountsHappyPath = require("../fixtures/accounts.happyPath.json");
    const seats = require("../fixtures/seats.json");
    const selectors = require("../fixtures/selectors.json");

    const singleAccount = accountsHappyPath[0]; // Берём только первый объект, если бы у нас было несколько
    cy.visit("https://qamid.tmweb.ru/admin/");
    cy.login(singleAccount.login, singleAccount.password);
    cy.contains(selectors.dashboard.managementHeader).should("be.visible");
    cy.get(selectors.movieSelection.movieChoiceByAdmin)
      .find(selectors.movieSelection.movieTitleClass)
      .invoke("text")
      .then((movieTitle) => {
        cy.visit("/");
        cy.get(selectors.navigation.daySelector4).click();
        cy.contains(selectors.movieSelection.movieItem, movieTitle).within(
          () => {
            cy.contains(selectors.movieSelection.hallType).should("be.visible");
            cy.contains(selectors.movieSelection.sessionTime17)
              .should("be.visible")
              .click();
          },
        );

        seats.forEach((seat) => {
          cy.get(
            `${selectors.seating.schemeWrapper} > :nth-child(${seat.row}) > :nth-child(${seat.seat})`,
          ).click();
        });
        cy.get(selectors.booking.confirmButton).click();
        cy.contains("Вы выбрали билеты:").should("be.visible");
      });
  });
});
