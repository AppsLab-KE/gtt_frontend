const manifestJSON = require('./public/manifest.json')

module.exports = {
    pwa: {
        themeColor: manifestJSON.theme_color,
        name: manifestJSON.short_name,
        msTileColor: manifestJSON.background_color,
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            swSrc: "src/service-worker.js",
            exclude: [
                /\.map$/, 
                /manifest\.json$/ 
            ],
        },
    },
    // devServer: {
    //     proxy: process.env.VUE_APP_API_DORMAIN_URL,
    // }
}
