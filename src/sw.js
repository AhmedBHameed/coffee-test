const cacheName = "Caffee-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/src.a85eef1a.js",
  "/src.aed7bf18.css",
  "/cup_empty.62c83817.png",
  "/cup_fill_1.a3d8b51e.png",
  "/cup_fill_2.606cb127.png",
  "/cup_full.867df466.png",
  "/cup_too_full.7fa8829d.png"
];

self.addEventListener("install", function(e) {
  console.log("Installing SW!");
  return e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", e => {
  // We can use it here to delete old versions of the app.
  console.log("Activating the service worker!");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      return (
        response ||
        fetch(event.request)
          .then(function(res) {
            return caches.open(cacheName).then(function(cache) {
              cache.put(event.request.url, res.clone()); //save the response for future
              return res; // return the fetched data
            });
          })
          .catch(function(err) {
            // fallback mechanism
            return caches.open(cacheName).then(function(cache) {
              return cache.match(urlsToCache);
            });
          })
      );
    })
  );
});
