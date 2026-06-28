const CACHE = 'keri-cliente-v1';
const ARCHIVOS = [
  '/keri-docs-cliente/',
  '/keri-docs-cliente/index.html',
  '/keri-docs-cliente/manifest.json',
  '/keri-docs-cliente/icon-96.png',
  '/keri-docs-cliente/icon-144.png',
  '/keri-docs-cliente/icon-192.png',
  '/keri-docs-cliente/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/keri-docs-cliente/index.html'))));
});
