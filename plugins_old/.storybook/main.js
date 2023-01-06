module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.@(js|jsx|ts|tsx)"
  ],
  babel: async options => ({
    ...options,
    plugins: [
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
    ],
  }),
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/web-components"
}