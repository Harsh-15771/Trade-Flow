module.exports = {
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['Routes/**/*.js', 'Middlewares/**/*.js'],
  setupFilesAfterEnv: ['./tests/setup.js'],
  testTimeout: 300000,
};
