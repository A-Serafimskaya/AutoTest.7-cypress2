Cypress.Commands.add("login", (login, password = null) => {
  const selectors = require("../fixtures/selectors.json");
  
  cy.get(selectors.login.emailInput).clear().type(login);
  if (password !== null) {
    cy.get(selectors.login.passwordInput).clear().type(password);
  }
  cy.get(selectors.login.loginButton).click();
});
