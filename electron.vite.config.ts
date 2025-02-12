import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
    // config options
    main: { 
        build: { 
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'src/main/index.ts')
                }
            }
        },
        plugins: [externalizeDepsPlugin()],
    },
    preload: {
        build: {
            rollupOptions: {
                input: {
                    preload: resolve(__dirname, 'src/preload/index.ts')
                }
            }
        },
        plugins: [externalizeDepsPlugin()],
    },
    renderer: {
        root: '.',
        build: {
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/renderer/index.html'),
                }
            }
        },
        plugins: [react()]
    }
})