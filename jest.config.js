module.exports = {
  bail: 3,
  clearMocks: true,
  preset: 'ts-jest',
  projects: [
    '<rootDir>/packages/*/jest.config.js',
    '<rootDir>/packages/*/config/jest.config.ts'
  ],
  testEnvironment: 'node',
  testMatch: ['*.test.ts','*.test.tsx']
}