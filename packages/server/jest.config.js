const { name } = require('./package.json');

module.exports = {
  displayName: name,
  name,
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/utils',
    '<rootDir>/__tests__/coverage'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: '<rootDir>/__tests__/coverage'
}