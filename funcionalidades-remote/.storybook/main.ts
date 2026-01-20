import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/nextjs"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  "staticDirs": [
    "..\\public"
  ],
  webpackFinal: async (config) => {
    // Remove Module Federation plugin for Storybook
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        (plugin) => plugin?.constructor?.name !== 'NextFederationPlugin'
      );
    }
    return config;
  },
};
export default config;