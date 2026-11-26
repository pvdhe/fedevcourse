import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// De React-plugin verwerkt JSX en werkt componenten tijdens ontwikkeling snel bij.
// Vite gebruikt deze configuratie voor de ontwikkelserver en de productiebuild.
export default defineConfig({
  plugins: [react()],
})
