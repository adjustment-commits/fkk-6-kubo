const CACHE_NAME = "ribcage-log-v2";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./offline.html",
  "./images/deadbug-1.jpg",
  "./images/bounce-1.jpg",
  "./images/hipdrift-1.jpg",
  "./images/press-1.jpg",
  "./images/mblead-1.jpg",
  "./images/wblead-1.jpg"
];

// インストール
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// フェッチ（オフライン時フォールバック）
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((response) => {
      return response || caches.match("./offline.html");
    }))
  );
});

// アクティベート（古いキャッシュ削除）
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
});
