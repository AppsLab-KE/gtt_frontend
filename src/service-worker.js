/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */

workbox.core.setCacheNameDetails({ 
    prefix: 'gtt',
    precache: 'precache',
    runtime: 'runtime',
 });
//Change this value every time before you build
const LATEST_VERSION = 'v1.0.5'
// eslint-disable-next-line no-unused-vars
self.addEventListener('activate', (_event) => {
  console.log(`%c ${LATEST_VERSION} `, 'background: #ddd; color: #0000ff')
  if (caches) {
    caches.keys().then((arr) => {
      arr.forEach((key) => {
        if (key.indexOf('gtt-precache') < -1) {
          caches.delete(key).then(() => console.log(`%c Cleared ${key}`, 'background: #333; color: #ff0000'))
        } else {
          caches.open(key).then((cache) => {
            cache.match('version').then((res) => {
              if (!res) {
                cache.put('version', new Response(LATEST_VERSION, { status: 200, statusText: LATEST_VERSION }))
              } else if (res.statusText !== LATEST_VERSION) {
                caches.delete(key).then(() => console.log(`%c Cleared Cache ${LATEST_VERSION}`, 'background: #333; color: #ff0000'))
              } else console.log(`%c Great you have the latest version ${LATEST_VERSION}`, 'background: #333; color: #00ff00')
            })
          })
        }
      })
    })
  }
});
workbox.skipWaiting();
workbox.clientsClaim();

// runtime cache
// 1. stylesheet
workbox.routing.registerRoute(
    new RegExp('\.css$'),
    workbox.strategies.cacheFirst({
        cacheName: 'gtt-cache-Stylesheets',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
                maxEntries: 20, // only cache 20 request
                purgeOnQuotaError: true
            })
        ]
    })
);
// 2. images
workbox.routing.registerRoute(
    new RegExp('\.(png|svg|jpg|jpeg)$'),
    workbox.strategies.cacheFirst({
        cacheName: 'gtt-cache-Images',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 7,
                maxEntries: 50,
                purgeOnQuotaError: true
            })
        ]
    })
);
// console.log(process.env.VUE_APP_API_BASE_URL)
// 3. cache post articles result
workbox.routing.registerRoute(
    new RegExp('https://app.geekstalkthursday.co.ke/api/'),
    // workbox.strategies.staleWhileRevalidate({
    new workbox.strategies.NetworkFirst({
        cacheName: 'gtt-cache-posts-data',
        cacheExpiration: {
            maxAgeSeconds: 60 * 30 //cache the news content for 30mn
        },
        plugins: [
            new workbox.cacheableResponse.Plugin({
              statuses: [200, 201, 0],
            }),
          ]
    })
);

workbox.routing.registerRoute(
    new RegExp(' https://gist.github.com/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'gtt-cache-posts-data-gists',
        cacheExpiration: {
            maxAgeSeconds: 60 * 30 //cache the news content for 30mn
        },
        plugins: [
            new workbox.cacheableResponse.Plugin({
              statuses: [200, 201, 0],
            })
          ]
    })
);

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
// eslint-disable-next-line no-unused-vars
workbox.routing.setCatchHandler(({event}) => {
    console.log('not found here');  
    return caches.match('/no-internet');
    
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest,'/no-internet', {});
workbox.routing.registerNavigationRoute('/index.html')

// install new service worker when ok, then reload page.
self.addEventListener("message", msg=>{
    if (msg.data.action=='skipWaiting'){
        self.skipWaiting()
    }
})

