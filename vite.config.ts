import { defineConfig } from 'vitest/config';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
  },
  plugins: [
    react(),
    mode !== 'test' &&
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint ./src',
        },
      }),
  ],
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'istanbul',
      reportsDirectory: './coverage',
    },
  },
}));
