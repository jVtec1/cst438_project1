// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure .wasm gets bundled as an asset
config.resolver.assetExts.push('wasm');

// (Optional but common in Expo projects)
config.transformer = config.transformer || {};
config.transformer.unstable_allowRequireContext = true;

module.exports = config;
