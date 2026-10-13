const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: { "\\.css$": "identity-obj-proxy" },
  watchman: false,
};

export default config
