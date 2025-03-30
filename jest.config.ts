import { Config } from "jest";

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    ".(ts|tsx)": ["ts-jest", { tsconfig: "tsconfig.app.json" }],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts", '@testing-library/jest-dom'],
};

module.exports = config;