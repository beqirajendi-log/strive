const CACHE = 'strive-v140';
const ASSETS = [
  '/strive/',
  '/strive/index.html',
  '/strive/css/styles.css',
  '/strive/js/programs/12week.js',
  '/strive/js/programs/531.js',
  '/strive/js/programs/dumbbells.js',
  '/strive/js/app.js',
  '/strive/manifest.json'
];
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
