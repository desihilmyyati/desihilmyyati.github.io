const CACHE_NAME = 'SW-001';
const toCache = [
  'manifest.json',
  'assets/image/favicon.png',
  'assets/image/mylaundry.png',
  'assets/image/mylaundry2.png',
  'assets/image/admin.png',
  'assets/css/style.css',
  'assets/js/splashscreen.js',
  'assets/js/admin.js',
  'assets/js/register.js',
  'laundry.js',
];

let deferredPrompt;

// Definisikan fungsi showInstallPromotion di sini
function showInstallPromotion() {
  // Misalnya, tampilkan pesan atau tombol untuk menginstal aplikasi
  console.log('Tampilkan pesan untuk mengundang pengguna untuk menginstal aplikasi.');
}

self.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(toCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match(event.request);
          });
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Hapus cache lama', key);
            return caches.delete(key);
          }
        }));
      })
      .then(() => self.clients.claim())
  );
});
