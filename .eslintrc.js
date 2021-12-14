module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
  },
  rules: {
    'vue/multi-word-component-names': ['error', {
      'ignores': ['index', '404', '403', '500'],
    }],
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
