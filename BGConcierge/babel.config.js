module.exports = {
  "presets": ["module:metro-react-native-babel-preset"],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./src/"],
        "alias": {
          "@assets": "./assets/",
          "@components": "./src/shared/components/",
          "@hooks": "./src/shared/hooks/",
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
