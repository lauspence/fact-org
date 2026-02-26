import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // The visualizer should usually be the last plugin
    visualizer({
      open: true,
      filename: 'stats.html',
      gzipSize: true,
      template: 'treemap', // 'sunburst' is also a cool option
    }),
  ],
})