'use strict';

var cacheName = '2018-10-18:0';
var OFFLINE_URL = 'https://zh11.ch/offline';

let URLS_TO_CACHE = [
  OFFLINE_URL,
  'https://zh11.ch/templates/zh11/js/global.min.js?V2019-04-25',
  'https://zh11.ch/templates/zh11/css/style.min.css?V2019-04-25'
];

// Wird nach der Installation ausgeführt
self.addEventListener('install', event => {

  console.log("[ServiceWorker] Installed")
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Open new cache: ', cacheName);
      return cache.addAll(URLS_TO_CACHE);
    })
  )
})

// Wird ausgeführt, sobal der ServiceWorker aktiv ist
self.addEventListener('activate', event => {
  console.log("[ServiceWorker] Activated")
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(thisCacheName => {
        if (thisCacheName !== cacheName) {
          console.log('[ServiceWorker] Deleting out of date cache:', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }));
    })
  );
});


self.addEventListener('fetch', function(event) {
  // We only want to call event.respondWith() if this is a GET request for an HTML document.
  if (event.request.method === 'GET' && event.request.headers.get('accept').indexOf('text/html') !== -1) {
    console.log('[ServiceWorker] Handling fetch event for', event.request.url);
    event.respondWith(fetch(event.request)
      .catch(function(e) {
        console.log('[ServiceWorker] Fetch failed; returning offline page instead.', e);
        return caches.open(cacheName).then(function(cache) {
          return cache.match(OFFLINE_URL);
        });
      })
    )
  }
});

importScripts("https://cdn.pushalert.co/sw-7021.js");

function showNotification(message) {
  var options = {
    body: message,
    icon: 'templates/zh11/res/logos/logo.png',
    vibrate: [100, 50, 100],
    data: {
      primaryKey: 1
    },
    actions: [{
      action: 'explore',
      title: 'Zur Webseite'
    }]
  };
  self.registration.showNotification('Cevi Züri 11', options);
}
