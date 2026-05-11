import { defineConfig } from 'tsdown'

export default defineConfig({
  deps: {
    neverBundle: ['eslint', '../package.json']
  },
  exports: true,
  inputOptions: {
    experimental: {
      attachDebugInfo: 'none'
    }
  }
})
