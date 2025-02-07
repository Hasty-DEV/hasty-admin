import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3002,
    watch: {
      usePolling: true,
    },
    hmr: {
      port: 3001,
      clientPort: 443,
      protocol: 'ws',
    },
  },
});
