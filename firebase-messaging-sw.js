importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:"AIzaSyA6ksXam7dRU02Nw1zHERTao9Lo9NePNNU",
  authDomain:"sgc-blok-b.firebaseapp.com",
  projectId:"sgc-blok-b",
  storageBucket:"sgc-blok-b.firebasestorage.app",
  messagingSenderId:"540181256635",
  appId:"1:540181256635:web:6ada3f435039f2404c4c9e"
});

const messaging = firebase.messaging();

// Tangani notif saat app di background
messaging.onBackgroundMessage(function(payload){
  const {title, body, icon, data} = payload.notification || {};
  self.registration.showNotification(title || 'SGC Blok B', {
    body: body || '',
    icon: icon || '/SGC-Blok-B/icon-192.png',
    badge: '/SGC-Blok-B/icon-192.png',
    data: data || {},
    vibrate: [200, 100, 200],
    tag: 'sgc-notif'
  });
});

// Klik notif → buka app
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  const url = e.notification.data?.url || 'https://nuryadipratama-cmyk.github.io/SGC-Blok-B/';
  e.waitUntil(clients.openWindow(url));
});
