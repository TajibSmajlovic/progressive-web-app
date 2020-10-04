const STATIC_CACHE = "static-v4";
const DYNAMIC_CACHE = "dynamic-v2";

self.addEventListener("install", function (event) {
  // console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(addToCache());
});

self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating Service Worker ....", event);
  event.waitUntil(removeOldCache());
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then((res) =>
      res
        ? res
        : fetch(event.request)
            .then((response) =>
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(event.request.url, response.clone());

                return response;
              })
            )
            .catch((_) => {})
    )
  );
});

async function addToCache() {
  try {
    const cache = await caches.open(STATIC_CACHE);

    cache.addAll([
      "/",
      "/index.html",
      "/src/js/app.js",
      "/src/js/feed.js",
      "/src/js/promise.js",
      "/src/js/fetch.js",
      "/src/js/material.min.js",
      "/src/css/app.css",
      "/src/css/feed.css",
      "/src/images/main-image.jpg",
      "https://fonts.googleapis.com/css?family=Roboto:400,700",
      "https://fonts.googleapis.com/icon?family=Material+Icons",
      "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
    ]);
  } catch (error) {
    console.alert("Error ljudino!");
  }
}

async function removeOldCache() {
  try {
    const keys = await caches.keys();

    return Promise.all(
      keys.map((key) => {
        if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          return caches.delete(key);
      })
    );
  } catch (error) {
    console.alert("Error ljudino!");
  }
}
