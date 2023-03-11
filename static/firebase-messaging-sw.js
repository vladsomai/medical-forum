// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');
firebase.initializeApp({
	apiKey: 'AIzaSyAlGV7zo72S08XJv15-TRe_L-cf0_Z8sbI',
	authDomain: 'medicalforum-19fb2.firebaseapp.com',
	projectId: 'medicalforum-19fb2',
	storageBucket: 'medicalforum-19fb2.appspot.com',
	messagingSenderId: '101056477350',
	appId: '1:101056477350:web:df621f81e384297ac15c67',
	measurementId: 'G-38V27RJVD6'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	// console.log('[firebase-messaging-sw.js] Received background message ', payload);
	// // Customize notification here
	// const notificationTitle = payload.notification.title;
	// const notificationOptions = {
	// 	body: payload.notification.body,
	// 	icon: '/favicon.png'
	// };
	// self.registration.showNotification(notificationTitle, notificationOptions);
});
