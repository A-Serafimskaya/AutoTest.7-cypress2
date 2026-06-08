describe("Correct page display tests", () => {
  it("Should show correct number of days", () => {
    const selectors = require("../fixtures/selectors.json");

    cy.visit("/");
    cy.get(selectors.navigation.daySelectorClass).should("have.length", 7);
  });

  it("Should show correct the page", () => {
    const selectors = require("../fixtures/selectors.json");

    cy.visit("/");
    cy.get(selectors.dashboard.headerCheck).should("be.visible");
  });
});

describe("admin login tests", () => {
  it("Should successfully login as admin", () => {
    const accountsHappyPath = require("../fixtures/accounts.happyPath.json");
    const selectors = require("../fixtures/selectors.json");

    accountsHappyPath.forEach((accountHappyPath) => {
      cy.visit("https://qamid.tmweb.ru/admin/");
      cy.login(accountHappyPath.login, accountHappyPath.password);
      cy.contains(selectors.dashboard.managementHeader).should("be.visible");
    });
  });

  it("Should not successfully login as admin", () => {
    const accountsSadPath = require("../fixtures/accounts.sadPath.json");
    const selectors = require("../fixtures/selectors.json");

    accountsSadPath.forEach((accountSadPath) => {
      cy.visit("https://qamid.tmweb.ru/admin/");
      cy.login(accountSadPath.login, accountSadPath.password);
      cy.contains(selectors.dashboard.managementHeader).should("not.exist");
    });
  });

  it("Should possible to book on Dostat' noghi ", () => {
    const seats2 = require("../fixtures/seats2.json");

    const selectors = require("../fixtures/selectors.json");

    cy.visit("/");
    cy.get(selectors.navigation.daySelectorClass).should("have.length", 7);
    cy.get(selectors.navigation.daySelectorClass)
      .contains(selectors.navigation.thurthday)
      .click();

    cy.window().then((win) => {
      win.scrollTo(0, 800); // скролл вниз на 800 px
    });

    cy.contains(selectors.movieSelection.movie).should("be.visible");
    cy.contains(selectors.movieSelection.sessionTime15)
      .should("be.visible")
      .click();

    seats2.forEach((seat) => {
      cy.get(
        `${selectors.seating.schemeWrapper} > :nth-child(${seat.row}) > :nth-child(${seat.seat})`,
      ).click();
    });
    cy.get(selectors.booking.confirmButton).click();
    cy.contains("Вы выбрали билеты:").should("be.visible");
  });
});
