var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('dist/')
    .setPublicPath('/dist')
    .addEntry('smart', './src/smart.js')
    .disableSingleRuntimeChunk()
    // .enableSassLoader()
    // .configureUrlLoader({
    //     fonts: { limit: 4096 },
    //     images: { limit: 4096 }
    // })
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableBuildNotifications()
;

var config = Encore.getWebpackConfig();

module.exports = config;
