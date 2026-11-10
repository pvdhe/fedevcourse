import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// De React-plugin laat Vite JSX verwerken en ondersteunt verversen tijdens ontwikkeling.
export default defineConfig({
  plugins: [react()],
})
