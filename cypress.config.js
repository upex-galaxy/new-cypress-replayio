const { defineConfig: defineCypressConfig } = require("cypress");
const { plugin: replayPlugin, wrapOn } = require("@replayio/cypress");
require('dotenv').config()
const replayioApiKey = process.env.REPLAYIO_APIKEY

module.exports = defineCypressConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const cyOn = wrapOn(on)
      replayPlugin(cyOn, config, {
        apiKey: replayioApiKey,
        upload: true,
      });
      return config;
    },
  },
});
