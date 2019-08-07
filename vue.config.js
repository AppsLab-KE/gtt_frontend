module.exports = {
    pwa: {
        workboxPluginMode: "InjectManifest",
        workboxOptions: {
            swSrc: "src/service-worker.js",
            exclude: [
                /\.map$/, 
                /manifest\.json$/ 
            ],
        },
        themeColor: '#2a9899'
    },
    // devServer: {
    //     proxy: process.env.VUE_APP_API_DORMAIN_URL,
    // }
}
