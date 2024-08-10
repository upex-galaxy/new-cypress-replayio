const { defineConfig: defineCypressConfig } = require("cypress");
const { plugin: replayPlugin } = require("@replayio/cypress");
require('dotenv').config()

module.exports = defineCypressConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const cyOn = wrapOn(on)
      replayPlugin(cyOn, config, {
        apiKey: process.env.REPLAY_API_KEY,
        upload: true,
      });
      return config;
    },
  },
});
