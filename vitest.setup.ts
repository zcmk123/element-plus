/* eslint-disable @typescript-eslint/no-var-requires */
// const { config } = require('@vue/test-utils')
// config.global.stubs = {}

import ResizeObserver from 'resize-observer-polyfill'
global.ResizeObserver = ResizeObserver
process.addListener('unhandledRejection', (err) => console.error(err))
