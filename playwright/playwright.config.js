// @ts-check
    const { defineConfig, devices } = require('@playwright/test');

    /**
     * Read environment variables from .env file.
     * For more information, read https://github.com/motdotla/dotenv
     */
    // require('dotenv').config();

    /**
     * @see https://playwright.dev/docs/test-configuration
     */
    module.exports = defineConfig({
      // Path to the test files directory
      testDir: './tests',
      /* Run tests in files in parallel */
      fullyParallel: true,
      /* Fail the build on CI if you accidentally left test.only in the source code. */
      forbidOnly: !!process.env.CI,
      /* Retry on CI only */
      retries: process.env.CI ? 2 : 0,
      /* Opt out of parallel tests on CI. */
      workers: process.env.CI ? 1 : undefined,
      /* Reporter to use. See https://playwright.dev/docs/test-reporters */
      reporter: 'html', // Use the built-in HTML reporter

      /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
      use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        // Assuming your Electron app will load from the Vite dev server for testing
        // Or if you build for production and test the file directly:
        // baseURL: 'file://path/to/your/frontend/dist/index.html'
        // For our case, since Electron loads the Vite dev server, we point to that.
        baseURL: 'http://localhost:5173', // The URL where your React app (frontend) is running

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',

        // Context options for testing Electron apps
        // headless: false, // Set to false to see the browser UI
        // launchOptions: {
        //   args: [
        //     './electron/main.js', // Path to your Electron main file (relative to playwright/ or root)
        //     // '--window-size=800,600' // Optional: Set window size
        //   ]
        // }
        // Note: For Electron testing directly, it's more complex.
        // We will test the web app directly first, which Electron consumes.
      },

      /* Configure projects for major browsers */
      projects: [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
        /*
        {
          name: 'firefox',
          use: { ...devices['Desktop Firefox'] },
        },
        {
          name: 'webkit',
          use: { ...devices['Desktop Safari'] },
        },
        */
      ],

      /* Run your local dev server before starting the tests */
      webServer: {
        // This command assumes you are running Playwright from the root of your project (calculator-app/)
        // and starts your frontend dev server.
        command: 'npm run start:frontend', // This script should be defined in your root package.json
        url: 'http://localhost:5173',
        timeout: 120 * 1000, // Give it plenty of time to start
        reuseExistingServer: !process.env.CI,
        // Also start the backend server
        // process.env.NODE_ENV === 'development' ensures the backend is running.
        // It's usually better to run backend separately in a different terminal for dev,
        // but for CI or integrated testing, you might start it here too.
        // This is a simplified example, you might need a more robust way to manage multiple servers.
        // command: 'npm run start:frontend && npm run start:backend', // This won't work easily with & in cross-platform
        // For integrated testing, consider a tool like 'concurrently' or separate processes.
      },
    });