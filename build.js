const copySync = require('fs-extra/lib/copy/copy-sync');
const { resolve } = require('path');
const { promise } = require('glob-promise');


const startTime = new Date();

const red     = '\u001b[31m';
const magenta = '\u001b[35m';
const reset   = '\u001b[0m';

console.log(`${magenta}The build has started...${reset}`);


(async () => {
  try {
    await require('estrella').build({
      entryPoints: ['src/app/index.ts'],
      bundle: true,
      outfile: 'dist/app/index.js',
      minify: false,
      sourcemap: true,
      platform: 'node',
      tsconfig: "tsconfig.json",
      external: ['electron']
    });

    await require('estrella').build({
      entryPoints: await promise('src/client/script/**/*.ts'),
      bundle: true,
      outdir: 'dist/client/scripts',
      minify: false,
      sourcemap: true,
      platform: 'browser',
      tsconfig: "tsconfig.json",
    });
    console.log(`${magenta}Build finished successfully.${reset} [${new Date().getTime() - startTime.getTime()}ms]`)

    copySync(resolve(__dirname, 'src/client/page'), resolve(__dirname, 'dist/client/page'));
    copySync(resolve(__dirname, 'src/client/style'), resolve(__dirname, 'dist/client/style'));
  } catch {
    console.log(`${red}Build failed.${reset} [${new Date().getTime() - startTime.getTime()}ms]`)
  }
})();
