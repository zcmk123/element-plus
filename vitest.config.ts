/// <reference types="vitest" />
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [Vue(), VueJsx()],
  test: {
    global: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
})
