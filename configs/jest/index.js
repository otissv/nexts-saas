module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/libs/**/*.test.ts',
    '**/libs/**/*.spec.ts',
  ],
}
