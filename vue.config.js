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
    }
}
