// @ts-check
/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
const config = {
  mutate: [
    'client/src/**/*.ts',
    '!client/src/**/*.test.ts',
  ],
  coverageAnalysis: 'perTest',
  packageManager: 'yarn',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  disableTypeChecks: 'client/src/**/*.{js,ts,tsx}',
  checkers: ['typescript'],
  tsconfigFile: 'tsconfig.json'
};

export default config;
