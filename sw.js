var CACHE_NAME_STATIC = 'sCCP-v6';
var CACHE_NAME_DYNAMIC = 'dCCP-v6';
var staticUrlsToCache = [
  '/',
  '/index.html',
  '/pages/fallback.html',
  '/js/app.js',
  '/js/db.js',
  '/js/ui.js',
  '/js/auth.js',
  '/js/materialize.min.js',
  '/img/ccpicon192.png',
  '/img/ccpicon512.png',
  '/img/emptyplate.jpg',
  '/img/meal.jpg',
  '/css/app.css',
  '/css/materialize.min.css',
  '/manifest.json',
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];
// **** INSTALL ****
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

  // **** ACTIVATE ****
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
  


  // **** FETCH *****
      self.addEventListener("fetch", function (event) {
        //fires whenever the app requests a resource (file or data)
        // console.log(`SW: Fetching ${event.request.url}`);
        //next, go get the requested resource from the network
        if(event.request.url.indexOf('googleapis.com') === -1 ) {
        event.respondWith(
          caches.match(event.request)
            .then((response) => {
              return (
                response ||
                fetch(event.request).then((fetchRes) => {
                  return caches.open(CACHE_NAME_DYNAMIC).then((cache) => {
                    cache.put(event.request.url, fetchRes.clone());
                    return fetchRes;
                  });
                })
              );
            })
            .catch(() => caches.match("/pages/fallback.html"))
        );
          }
      });
