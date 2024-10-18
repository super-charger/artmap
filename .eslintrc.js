const { rules } = require('@toktokhan-dev/eslint-config/base')

const config = {
  extends: [
    '@toktokhan-dev/eslint-config/base',
    'plugin:@next/next/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['tailwindcss'],
  rules: {
    // import 문에 대한 권장 규칙
    'import/order': 'off',
    '@typescript-eslint/no-require-imports': 'off',

    /** https://runebook.dev/ko/docs/eslint/rules/no-unused-vars **/
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all', // 모든 변수에 대해 사용 여부를 검사
        varsIgnorePattern: '^_', // _로 시작하는 변수는 사용하지 않아도 무시
        args: 'after-used', // 사용되지 않은 매개변수 에러
        argsIgnorePattern: '^_', // _로 시작하는 매개변수는 사용하지 않아도 무시
        caughtErrors: 'none',
        reportUsedIgnorePattern: false, // 무시 패턴(ignore pattern)에 의해 무시된 변수가 실제로 사용될 때 이를 보고할지 여부
      },
    ],

    // 커스텀 클래스가 있을때 오류를 발생시키지 않습니다.
    'tailwindcss/no-custom-classes': 'off',
    // 알파벳 순서로 정렬하도록 요구
    'tailwindcss/classnames-order': 'off',
  },
}

module.exports = config
