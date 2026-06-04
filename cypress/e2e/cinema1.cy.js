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
});

