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
    ],
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blacklist": null,
      "whitelist": null,
      "safe": false,
      "allowUndefined": true
    }]
  ],
  "env": {
    "production": {
      "plugins": ["react-native-paper/babel"]
    }
  }
};
