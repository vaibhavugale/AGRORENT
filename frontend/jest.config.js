const { defaults } = require("jest-config");

module.exports = {
  
  moduleFileExtensions: [...defaults.moduleFileExtensions, "js"],
  setupFiles: ["<rootDir>/src/__test__/setupTests.js"],
  setupFilesAfterEnv: ["<rootDir>/src/__test__/setupTestsAfterEnv.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "./__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  transformIgnorePatterns: ["node_modules/(?!swiper|ssr-window|dom7).*/"]
  
};