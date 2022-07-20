/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/**/*.test.ts",
    "**/*.test.ts",
    "*.test.ts",
    "**/0**/**/*.test.ts",
  ],
  verbose: true,
  clearMocks: true,
};
