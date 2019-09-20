const cacheName = "Caffee-v1";

const urlsToCache = ["/", "/index.html", "/cup_*", "/manifest.js", "/*"];

self.addEventListener("install", function(e) {
  console.log("Installing SW!");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", e => {
  // We can use it here to delete old versions of the app.
  console.log("Activating the service worker!");
});

function cacheFirst(req) {
  caches.open(cacheName).then(function(cache) {
    cache.match(req).then(function(cached) {
      return cached || fetch(req);
    });
  });
}

function networkAndCache(req) {
  return caches
    .open(cacheName)
    .then(function(cache) {
      fetch(req)
        .then(function(fresh) {
          cache.put(req, fresh.clone());
          return fresh;
        })
        .catch(function(err) {
          console.error("Fetch error", err);
        });
    })
    .catch(function(err) {
      console.error("Caches error", err);
    });
}

self.addEventListener("fetch", function(e) {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    return e.respondWith(cacheFirst(req));
  } else {
    return e.respondWith(networkAndCache(req));
  }
});
