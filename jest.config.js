module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  bail: true,
  collectCoverageFrom: ["./lib/**/*.ts"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageThreshold: {
    global: {
      branches: 39,
      functions: 20,
      lines: 60,
      statements: 60,
    },
  },
  testMatch: ["**/?(*.)+(spec).ts?(x)"],
};
