importScripts('https://www.gstatic.com/firebasejs/5.5.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.3/firebase-messaging.js');
firebase.initializeApp({
  apiKey: 'AIzaSyChrMEk9YKl0laLDD0QC2D2JNTa5diyliE',
  authDomain: 'mypipeline-94ebd.firebaseapp.com',
  databaseURL: 'https://mypipeline-94ebd.firebaseio.com',
  projectId: 'mypipeline-94ebd',
  storageBucket: 'mypipeline-94ebd.appspot.com',
  messagingSenderId: '798608606039',
  appId: '1:798608606039:web:e00e7c9791fa5b7f743412',
  measurementId: 'G-HM0B9E4Z3C'
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
