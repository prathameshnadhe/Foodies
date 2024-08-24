/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",

  // Map image imports to the mock file
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg|avif)$":
      "<rootDir>/src/components/__mocks__/fileMock.js",
  },

  // If you use CSS modules or other non-JS imports, you might need these:
  // '\\.(css|less)$': 'identity-obj-proxy',
};

module.exports = config;
