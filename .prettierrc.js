const base = require('@toktokhan-dev/prettier-config/base.js')

/** @type {import("prettier").Config} */
const config = {
  ...base,
  plugins: [...(base.plugins || []), 'prettier-plugin-tailwindcss'],
}

module.exports = config
