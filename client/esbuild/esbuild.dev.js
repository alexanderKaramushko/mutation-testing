const path = require('path');
const dotenv = require('dotenv');
const esbuild = require('esbuild');
const liveServer = require('live-server');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { sassPlugin, postcssModules } = require('esbuild-sass-plugin');
const postCssImport = require('postcss-import');
const envFilePlugin = require('esbuild-envfile-plugin');

const env = require('envalid');

dotenv.config();

env.cleanEnv(process.env, {
  HOST: env.str(),
  PORT: env.port(),

  ROOT: env.str(),
  SPA_INDEX: env.str(),
  ENTRY: env.str(),
  OUT_FILE: env.str(),
  API_SERVICE: env.str(),

  WAIT_FOR_CHANGES: env.num(),

  NODE_ENV: env.str(),
});

const host = process.env.HOST;
const port = process.env.PORT;
const root = process.env.ROOT;
const entry = process.env.ENTRY;
const spaIndex = process.env.SPA_INDEX;
const outFile = process.env.OUT_FILE;
const apiService = process.env.API_SERVICE;
const waitForChangesMs = process.env.WAIT_FOR_CHANGES || 1000;

const globalScssPaths = ['./src/styles'];

const params = {
  host,
  port,
  root,
  open: false,
  file: spaIndex,
  wait: waitForChangesMs,
  middleware: [
    (req, res, next) => {
      const commonOptions = {
        changeOrigin: true,
        secure: false
      };

      if (req.url.includes('/api/')) {
        return createProxyMiddleware({
          target: apiService,
          ...commonOptions
        })(req, res, next);
      }

      return next();
    }
  ]
};

liveServer.start(params);

const options = {
  entryPoints: [entry],
  outfile: outFile,
  bundle: true,
  watch: {
    onRebuild(error) {
      if (error) {
        console.error('esbuild: build failed:', error.getMessage());
      } else {
        console.log('esbuild: build succeeded');
      }
    }
  },
  format: 'iife',
  minify: false,
  sourcemap: 'linked',
  plugins: [
    envFilePlugin,
    sassPlugin({
      transform: postcssModules(
        {
          basedir: '',
          globalModulePaths: globalScssPaths
        },
        [postCssImport()]
      ),
    })
  ],
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
