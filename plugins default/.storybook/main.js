module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions"
  ],
  babel: async options => ({
    ...options,
    plugins: [
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining',
    ],
  }),
  "framework": "@storybook/web-components"
}