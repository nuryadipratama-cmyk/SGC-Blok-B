const CACHE = 'sgc-blok-b-v2';
const ASSETS = [
  '/SGC-Blok-B/',
  '/SGC-Blok-B/index.html',
  '/SGC-Blok-B/icon-192.png',
  '/SGC-Blok-B/icon-512.png',
  '/SGC-Blok-B/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(()=>{})
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
  // Hanya cache GET request, skip Firebase/EmailJS
  if(e.request.method !== 'GET') return;
  const url = e.request.url;
  if(url.includes('firestore.googleapis.com') ||
     url.includes('firebase') ||
     url.includes('emailjs.com')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        if(res && res.status === 200) {
          const resClone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, resClone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
