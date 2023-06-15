// import { dependencies } from './package.json';
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// function renderChunks(deps: Record<string, string>) {
//   const chunks = {};
//   Object.keys(deps).forEach((key) => {
//     if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
//     chunks[key] = [key];
//   });
//   return chunks;
// }

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ':src': path.resolve(__dirname, './src')
    },
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         vendor: ['react', 'react-router-dom', 'react-dom'],
  //         ...renderChunks(dependencies),
  //       },
  //     },
  //   },
  // },
})
