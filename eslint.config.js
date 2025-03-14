import config from '@shcherbin/eslint-config'

export default [
  ...config.nodeTypescript,
  {
    files: ['**/template.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    rules: {
      'no-console': 'off'
    }
  }
]
