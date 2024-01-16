const { defineConfig } = require('cypress')

module.exports = defineConfig({
  "browser": "chrome",
  projectId: "vk7pj8",

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
  },
});
