const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "u9qizc",
  //retries: 2,
  allowCypressEnv: false,
  viewportWidth: 1366,
  viewportHeight: 768,

  e2e: {
    baseUrl: "https://qamid.tmweb.ru/client/index.php",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
