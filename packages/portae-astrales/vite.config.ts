import react from '@vitejs/plugin-react-swc';
import {
  join,
  //resolve,
} from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// versions
import { version } from './package.json';

export default (() => {
  const outDir = join(__dirname, 'dist', 'client');
  // const srcDir = join(__dirname, 'src', 'client');

  return defineConfig({
    build: {
      outDir,
    },
    define: {
      __VERSION__: JSON.stringify(version),
    },
    plugins: [
      react(),
      tsconfigPaths({
        configNames: ['tsconfig.build.json'],
      }),
    ],
    server: {
      port: 8080,
    },
  });
})();
