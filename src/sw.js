const staticCacheName = "site-static";
const dynamicCacheName = "site-dynamic";

const assets = ["/", "/index.html", "/offline/index.html"];

// cache size limit
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (event) => {
  if (event.request.url.indexOf("firestore.googleapis.com") === -1) {
    event.respondWith(
      caches
        .match(event.request)
        .then((cacheRes) => {
          return (
            cacheRes ||
            fetch(event.request).then((fetchRes) => {
              return caches.open(dynamicCacheName).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                limitCacheSize(dynamicCacheName, 80);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          if (event.request.url.indexOf(".html") > -1) {
            return caches.match("/offline/index.html");
          }
        })
    );
  }
});
