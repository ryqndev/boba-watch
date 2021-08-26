const version = 'boba-watch-v3.0.0';

const files = [
    '/bobawatch.png',
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        const cache = await caches.open(version);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(files);
    })());

    console.log(caches);
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then(keyList => {
        Promise.all(keyList.forEach((key) => {
            console.log("removing cache", key)
            if (key === version) return;
            caches.delete(key);
        }));
    }));
});
