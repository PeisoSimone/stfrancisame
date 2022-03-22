
const cacheName = 'AME-v1';
const staticAssets = [
  'index.html',
  '/html/easter.html',
  '/html/about.html',
  '/html/gallery.html',
  '/html/mokhobo.html',
  '/html/nkagisang.html',
  '/html/seitshiro.html',
  '/html/shuping.html',
  '/html/sithole.html',
  '/html/structure.html',
  '/css/style.css',
  '/js/jquery-3.2.1.js',
  '/js/script.js',
  '/img/ame.png',
  '/img/ame3.png',
  '/img/ame4.png',
  '/img/background.png',
  '/img/Capture.png',
  '/img/Capture2.png',
  '/img/Capture3.png',
  '/img/Capture4.png',
  '/img/Capture5.png',
  '/img/ext6.png',
  '/img/IMG_0064.png',
  '/img/mo1.png',
  '/img/mokhobo.PNG',
  '/img/mom_mokhobo.PNG',
  '/img/mom_nkagiseng.PNG',
  '/img/mom_shuping.PNG',
  '/img/Mother Kalahari.tif',
  '/img/Nkagiseng.PNG',
  '/img/pic(1).png',
  '/img/pic(2).png',
  '/img/pic(3).png',
  '/img/pic(4).png',
  '/img/pic(5).png',
  '/img/pic(6).png',
  '/img/pic(7).png',
  '/img/pic(8).png',
  '/img/pic(9).PNG',
  '/img/pic(10).PNG',
  '/img/pic(11).PNG',
  '/img/pic(12).png',
  '/img/pic(13).PNG',
  '/img/pic(14).png',
  '/img/pic(15).png',
  'facebook_page',
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}