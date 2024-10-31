const config = {
  extends: [
    '@toktokhan-dev/eslint-config/base',
    'plugin:@next/next/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['tailwindcss'],
  rules: {
    // tailwind 규칙
    'tailwindcss/no-custom-classes': 'off',
    'tailwindcss/classnames-order': 'off',
  },
}

module.exports = config
