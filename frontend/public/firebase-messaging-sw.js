importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js"
);
import { appConfig } from '../src/constants';
const firebaseConfig = {
  apiKey: "AIzaSyBJXyrn_SE0hq801jvyH3LaD1q5TV9TInM",
  authDomain: "zotalabs-tutor.firebaseapp.com",
  databaseURL: "https://zotalabs-tutor.firebaseio.com",
  projectId: "zotalabs-tutor",
  storageBucket: "zotalabs-tutor.appspot.com",
  messagingSenderId: "988368550309",
  appId: "1:988368550309:web:21e3c9acbb312db029104c",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    data: payload.data,
  };

  self.addEventListener("notificationclick", (event) => {
    console.log("Event Data ", event.notification.data);
    if (event.notification.data.messageType === "DISCUSSIONS") {  
      console.log("Directing it to ", event.notification.data.chapterId);
      if (event.notification.data.isMessageFromTutor) {
        clients.openWindow(appConfig+"/teacher/myCourses/modules/chapter/" + event.target.data.chapterId);
      } else {
        clients.openWindow(appConfig+"/student/myCourses/modules/chapter/" + event.target.data.chapterId);
      }
    }
    else {
      if (event.notification.data.isMessageFromTutor) {
        clients.openWindow("http://localhost:3000/teacher/messages");
      } else {
        clients.openWindow("http://localhost:3000/student/messages");
      }
    }
    event.notification.close();
  });

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}
