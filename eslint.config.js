import config from '@shcherbin/eslint-config'

export default [
  ...config.nextTypescript,
  {
    rules: {
      'no-console': 'off'
    }
  }
]
