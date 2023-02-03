import { defineConfig } from 'tsup';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist/build',
  sourcemap: isDev,
  dts: isDev,
  onSuccess: isDev ? 'npm run start:prod' : undefined,
  clean: !isDev,
  minify: !isDev,
});
