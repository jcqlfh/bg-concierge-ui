module.exports = {
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./src/"],
        "alias": {
          "@components": "./src/shared/components/",
          "@assets": "./assets/",
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
