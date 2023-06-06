import firebase from 'firebase/app'
import 'firebase/messaging'
import 'firebase/auth'
import NotificationService from './services/NotificationService'

export async function initializeFirebase () {
  const firebaseConfig = {
    apiKey: "AIzaSyChrMEk9YKl0laLDD0QC2D2JNTa5diyliE",
    authDomain: "mypipeline-94ebd.firebaseapp.com",
    databaseURL: "https://mypipeline-94ebd.firebaseio.com",
    projectId: "mypipeline-94ebd",
    storageBucket: "mypipeline-94ebd.appspot.com",
    messagingSenderId: "798608606039",
    appId: "1:798608606039:web:e00e7c9791fa5b7f743412",
    measurementId: "G-HM0B9E4Z3C"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
  const messaging = firebase.messaging()
  await navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
    firebase.messaging().useServiceWorker(registration)
  })
  Notification.requestPermission().then(async function (permission) {
    if (permission === 'granted') {
      messaging.getToken().then(async function (currentToken) {
        if (currentToken) {
          saveToken(currentToken)
        }
      }).catch((err) => {
        alert('An error occurred while retrieving token. ' + JSON.stringify(err))
      })
      messaging.onTokenRefresh(() => {
        messaging.getToken().then(async function (refreshedToken) {
          saveToken(refreshedToken)
        }).catch((err) => {
          alert('Unable to retrieve refreshed token ' + JSON.stringify(err))
        })
      })
      messaging.onMessage((payload) => {
        alert('Message received.  ' + JSON.stringify(payload))
      })
    }
  })
}

async function saveToken (token) {
  if (localStorage.getItem('user') != null) {
    await NotificationService.saveToken(token)
  }
}
