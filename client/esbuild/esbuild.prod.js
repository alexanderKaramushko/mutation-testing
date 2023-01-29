const path = require('path');
const dotenv = require('dotenv');
const esbuild = require('esbuild');
const { sassPlugin, postcssModules } = require('esbuild-sass-plugin');
const postCssImport = require('postcss-import');
const envFilePlugin = require('esbuild-envfile-plugin');
const { dependencies } = require('../../package.json');
const { execSync } = require('child_process');

const env = require('envalid');

dotenv.config();

env.cleanEnv(process.env, {
  ENTRY: env.str(),
  OUT_FILE: env.str(),
  NODE_ENV: env.str(),
});

const entry = process.env.ENTRY;
const outFile = process.env.OUT_FILE;
const generateDeclarations = process.env.GENERATE_DECLARATIONS;

const globalScssPaths = ['./src/styles'];

const typeScriptDeclarationsPlugin = generateDeclarations === 'true' && ({
  name: 'TypeScriptDeclarationsPlugin',
  setup(build) {
    build.onEnd((result) => {
      if (result.errors.length > 0) {
        return;
      }
      execSync('tsc')
    })
  }
});

const options = {
  entryPoints: [entry],
  outfile: outFile,
  bundle: true,
  watch: false,
  minify: false,
  sourcemap: false,
  external: Object.keys(dependencies),
  target: ["esnext", "node12.22.0"],
  format: 'esm',
  plugins: [
    envFilePlugin,
    sassPlugin({
      transform: postcssModules(
        {
          basedir: '',
          globalScssPaths
        },
        [postCssImport()]
      ),
    }),
    typeScriptDeclarationsPlugin,
  ].filter(Boolean),
  loader: {
    '.png': 'file',
    '.jpeg': 'file',
    '.jpg': 'file',
    '.js': 'jsx'
  }
};

esbuild.build(options).catch(err => {
  console.error(err);
});
