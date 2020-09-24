self.addEventListener("install", (e) => {
  console.log(e);
});

self.addEventListener("activate", (e) => {
  console.log(e);
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  console.log(e);
  e.respondWith(fetch(e.request));
});
