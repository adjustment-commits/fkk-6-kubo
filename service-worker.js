const CACHE_NAME = "ribcage-log-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./images/deadbug-1.jpg",
  "./images/bounce-1.jpg",
  "./images/hipdrift-1.jpg",
  "./images/press-1.jpg",
  "./images/mblead-1.jpg",
  "./images/wblead-1.jpg"
];

// インストール時：キャッシュ保存
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// オフライン時：キャッシュを返す
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

// 新バージョン検出時：古いキャッシュ削除
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
});
