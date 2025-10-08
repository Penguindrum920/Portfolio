import { defineConfig } from 'vite'
import restart from 'vite-plugin-restart'

// https://vitejs.dev/config/
export default defineConfig({
    // ===================================================================
    // ==> ADD THIS 'base' PROPERTY AND CUSTOMIZE IT FOR GITHUB PAGES  <==
    // ===================================================================
    base: '/Portfolio/',

    // Your existing configuration (no changes needed below)
    root: 'src/', // Sources files (typically where index.html is)
    publicDir: '../static/', // Path from "root" to static assets
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
    plugins:
    [
        restart({ restart: ['../static/**'] }) // Restart server on static file change
    ],
})
