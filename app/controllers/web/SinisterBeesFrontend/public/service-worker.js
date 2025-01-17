self.addEventListener('install', async (event) => {
    event.waitUntil(
      fetch('/worker.json')
        .then((response) => response.json())
        .then((config) => {
          const { filesToCache, cacheName } = config;
          return caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
          });
        })
        .catch((err) => console.error('Failed to fetch worker.json:', err))
    );
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== 'my-app-cache-v1') {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  