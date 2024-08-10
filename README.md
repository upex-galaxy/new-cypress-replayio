# Cypress.io Overview

To use Replay to record your Cypress.io tests, you can replace the browser you're using to record your tests with the [Replay Chrome driver](https://replay.io/docs/getting-started).

```bash
npx cypress run --browser replay-chromium
```

## Getting Started

### 1. Create a New Test Suite Team
Start by visiting our [new test suite form](https://replay.io/docs/getting-started). It will create an API key and guide you through each step.

### 2. Install the Replay Cypress Plugin
To install the plugin, run the following command:

```bash
npm install --save-dev @replayio/cypress
```

You can also use yarn, pnpm, or bun depending on your package manager preference.

### 3. Install the Replay Browser
Next, install the Replay browser with the following command:

```bash
npx replayio install
```

### 4. Save Your API Key
To use your API key, you can either use the [dotenv package](https://www.npmjs.com/package/dotenv) and save it to a `.env` file or add the API key to your environment directly.

```env
REPLAY_API_KEY=<your_api_key>
```

### 5. Add the Plugin to Your Project
Add the plugin to your `cypress.config.js` and `support` files.

In your `cypress/support/e2e.js`:

```javascript
require('@replayio/cypress/support')
```

In your `cypress.config.js`:

```javascript
const { defineConfig } = require('cypress')
const { plugin: replayPlugin, wrapOn } = require('@replayio/cypress')
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(cyon, config) {
      const on = wrapOn(cyon)
      replayPlugin(on, config, {
        upload: true, // automatically upload your replays
        apiKey: process.env.REPLAY_API_KEY,
      })
      return config
    },
  },
})
```

### 6. Run Your Test
With everything set up, you can now run:

```bash
npx cypress run --browser replay-chromium
```

This command will record and upload your first Cypress replays.


## Record Your Test Suite in CI

Now that you're ready to inspect your local tests, the next step is to record your tests in CI. Learn how to set up Replay with your Cypress tests on [GitHub Actions](https://replay.io/docs/github-actions) and other CI providers.

### GitHub Actions with Cypress

The following example uses [Cypress GitHub Action](https://replay.io/docs/github-actions) that provides dependency installation, built-in caching, and multiple options for advanced workflow configuration. For recording your test, the `replay-chromium` browser needs to be passed as a browser.

```yaml
name: End-to-end tests
on: push
jobs:
  cypress-run:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Install Replay Chromium
        run: npx replayio install
      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          browser: replay-chromium
        env:
          REPLAY_API_KEY: ${{ secrets.REPLAY_API_KEY }}
```

Running with the Replay browser will create your replays. These are stored locally on your CI and need to be uploaded to the Replay app once the test run is finished.

---

For more information, check out the [Replay Documentation](https://replay.io/docs/).