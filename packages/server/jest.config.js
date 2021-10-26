const { name } = require('./package.json');

module.exports = {
  displayName: name,
  name,
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/utils',
    '<rootDir>/__tests__/factories.*s',
    '<rootDir>/__tests__/coverage'
  ],
  collectCoverage: true,
  // collectCoverageFrom - glob pattern
  collectCoverageFrom: [
    '**/*.{js,ts}',
    //excludes
    '!**/app/models/index.*'
  ],
  coverageDirectory: '<rootDir>/__tests__/coverage',
  testTimeout: 10000,
}