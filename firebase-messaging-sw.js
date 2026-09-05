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
const APP_URL = 'https://nuryadipratama-cmyk.github.io/SGC-Blok-B/';

// Tangani notif saat app di background
messaging.onBackgroundMessage(function(payload){
  console.log('[SW] Background message:', payload);
  const notification = payload.notification || {};
  const data = payload.data || {};
  
  self.registration.showNotification(notification.title || 'SGC Blok B', {
    body: notification.body || '',
    icon: '/SGC-Blok-B/icon-192.png',
    badge: '/SGC-Blok-B/icon-192.png',
    data: { url: APP_URL, type: data.type || '' },
    vibrate: [500, 200, 500, 200, 500],
    requireInteraction: true,
    tag: 'sgc-panic'
  });
});

// Klik notif → buka/fokus app
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  const url = APP_URL;
  e.waitUntil(
    clients.matchAll({type:'window', includeUncontrolled:true}).then(function(clientList){
      // Kalau app sudah terbuka, fokus ke sana
      for(let i=0;i<clientList.length;i++){
        const client=clientList[i];
        if(client.url.includes('SGC-Blok-B')&&'focus' in client){
          return client.focus();
        }
      }
      // Kalau belum terbuka, buka baru
      if(clients.openWindow) return clients.openWindow(url);
    })
  );
});
