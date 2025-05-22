const CACHE_NAME = "todolist-cache-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./CSS/main.css",
    "./JS/main.js",
    "./JS/time.js",
    "./assets/favicon.png",
    "./offline.html"
];


self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match('./offline.html');
      });
    })
  );
});
