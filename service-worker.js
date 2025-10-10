const CACHE_NAME = "ribcage-log-v1";
const urlsToCache = [
  "index.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// インストール
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// フェッチ
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
