var CACHE_NAME_STATIC = 'sCCP-v1';
var CACHE_NAME_DYNAMIC = 'dCCP-v1';
var staticUrlsToCache = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/db.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/img/ccpicon192.png',
  '/img/ccpicon512.png',
  '/img/emptyplate.jpg',
  '/img/meal.jpg',
  '/css/app.css',
  '/css/materialize.min.css',
  '/manifest.json',
  '/pages/fallback.html'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME_STATIC)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(staticUrlsToCache);
      })
  );
    console.log(`SW: Event fired: ${event.type}`);
  });

  self.addEventListener("activate", function (event) {
    //fires after the service worker completes its installation.
    // It's a place for the service worker to clean up from
    // previous service worker versions.

    event.waitUntil(
      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME_STATIC)
            .map((key) => caches.delete(key))
        );
      })
    );

  });
  
  self.addEventListener("fetch", function (event) {
    //fires whenever the app requests a resource (file or data)
    // check if request is made by chrome extensions or web page
    // if request is made for web page url must contains http.
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return (
            response ||
            fetch(event.request).then((fetchRes) => {
              return caches.open(CACHE_NAME_DYNAMIC).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                limitCacheSize(CACHE_NAME_DYNAMIC,15);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => caches.match("/pages/fallback.html"))
    );
  })
