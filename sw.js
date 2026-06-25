const CACHE = 'strive-v139';
const ASSETS = [
  '/peakblock/',
  '/peakblock/index.html',
  '/peakblock/css/styles.css',
  '/peakblock/js/programs/12week.js',
  '/peakblock/js/programs/531.js',
  '/peakblock/js/programs/dumbbells.js',
  '/peakblock/js/app.js',
  '/peakblock/manifest.json'
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
