importScripts('https://www.gstatic.com/firebasejs/5.5.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.3/firebase-messaging.js');
firebase.initializeApp({
  'messagingSenderId': '798608606039'
});
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.'
  };
  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
