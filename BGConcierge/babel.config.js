module.exports = {
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./src/"],
        "alias": {
          "@assets": "./assets/",
          "@shared": "./src/shared/",
        }
      }
    ]
  ],
  "env": {
    "production": {
      "plugins": ["react-native-paper/babel"]
    }
  }
};
