const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add .wgsl to assetExts
config.resolver.assetExts.push('wgsl');

module.exports = withNativeWind(config, { input: './global.css' });