importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAU8eDZy_fbUEJMrm0hiL1Kf2FrHh5CUEs",
  authDomain: "my-react-app-3747d.firebaseapp.com",
  projectId: "my-react-app-3747d",
  storageBucket: "my-react-app-3747d.appspot.com",
  messagingSenderId: "238568172567",
  appId: "1:238568172567:web:b99f4dcb81213884bcc052"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});