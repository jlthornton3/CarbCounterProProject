self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.open('mysite-dynamic').then(function (cache) {
        return cache.match(event.request).then(function (response) {
          return (
            response ||
            fetch(event.request).then(function (response) {
              cache.put(event.request, response.clone());
              return response;
            })
          );
        });
      }),
    );
  });
  

  if(event.request.url.indexOf('googleapis.com') === -1 ) {
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
  }