const { name } = require('../package.json');

import { Config } from '@jest/types';

module.exports = {
  displayName: name,
  name,
  rootDir: '../',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/coverage',
    '<rootDir>/__tests__/utils/truncate',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**'],
  coverageDirectory: '<rootDir>/__tests__/coverage',
  verbose: true
} as Config.InitialOptions