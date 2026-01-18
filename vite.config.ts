import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Library build only if explicitly building as library (mode === 'lib')
  const isLibraryBuild = command === 'build' && mode === 'lib';
  
  return {
    plugins: [react(), ...(isLibraryBuild ? [dts()] : [])],
    ...(isLibraryBuild && {
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'SnappyCart',
          fileName: 'index',
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
    }),
  };
})