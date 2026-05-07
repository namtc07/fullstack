const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Thêm đoạn này để giúp Jest hiểu '@/' tương đương với thư mục 'src/'
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
