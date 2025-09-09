

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
   
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  }
};
export default config;