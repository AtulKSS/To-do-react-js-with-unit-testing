module.exports = {
   
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    moduleFileExtensions: ["js", "jsx"],
    moduleDirectories: ["node_modules"],
   
  };
  