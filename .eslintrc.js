module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': 0,
    'react-native/no-inline-styles': 0,
    'react-hooks/exhaustive-deps': 0,
    'no-unused-vars': 1,
    '@typescript-eslint/no-unused-vars': ['warn'],
    'react/no-unstable-nested-components': 0,
  },
};
