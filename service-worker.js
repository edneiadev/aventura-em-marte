const CACHE_NAME = 'aventura-em-marte-v2';
const APP_SHELL = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/assets/images/icon-192x192.png',
    '/assets/images/icon-512x512.png',
    '/assets/images/icone.jpg',
    '/assets/images/tela-inicial.jpg',
    '/assets/images/narrativa-1.jpg',
    '/assets/images/narrativa-2.jpg',
    '/assets/images/narrativa-3.jpg',
    '/assets/images/narrativa-4.jpg',
    '/assets/images/narrativa-5.jpg',
    '/assets/images/narrativa-6.jpg',
    '/assets/images/narrativa-7.jpg',
    '/assets/images/nivel1-vitoria.jpg',
    '/assets/images/nivel1-derrota.jpg',
    '/assets/images/nivel2-vitoria.jpg',
    '/assets/images/nivel2-derrota.jpg',
    '/assets/images/nivel3-vitoria.jpg',
    '/assets/images/nivel3-derrota.jpg',
    '/assets/images/pistas.jpg',
    '/assets/images/vitoria-final.jpg',
    '/assets/images/derrota-final.jpg',
    '/assets/images/acerto.jpg',
    '/assets/images/erro.jpg',
    '/assets/sounds/acerto.mp3',
    '/assets/sounds/erro.mp3',
    '/assets/sounds/tempo-esgotado.mp3',
    '/assets/sounds/derrota.mp3',
    '/assets/sounds/vitoria.mp3',
    '/assets/sounds/cronometro.mp3',
    '/assets/sounds/musica.mp3'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const requestUrl = new URL(event.request.url);

    if (requestUrl.origin !== self.location.origin) return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            const networkFetch = fetch(event.request)
                .then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    if (event.request.mode === 'navigate') {
                        return caches.match('/index.html').then(indexResponse => {
                            if (indexResponse) return indexResponse;
                            return new Response('Offline - Recurso não disponível', {
                                status: 503,
                                statusText: 'Service Unavailable',
                                headers: new Headers({
                                    'Content-Type': 'text/plain'
                                })
                            });
                        });
                    }
                    return new Response('Offline - Recurso não disponível', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/plain'
                        })
                    });
                });

            return cachedResponse || networkFetch;
        })
    );
});
