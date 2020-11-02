import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { IntlProvider } from "react-intl";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.js";
import * as serviceWorker from "./serviceWorker";
import Routes from "./routes";
import store from "./store";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./style.scss";
import axios from "axios";
// import { appConfig } from "./constants";

// import firebase from "./firebase";

import Loading from "./shared/Components/Loading";

axios.defaults.withCredentials = true;

// const store = createStore(rootReducer);
toast.configure();
let persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={<Loading isLoading={true}></Loading>}
      persistor={persistor}
    >
      <IntlProvider locale="en">
        <div 
        id="mainView"
        style={{
          // marginTop:"3%",
          width:"100%",marginLeft:"0px"}}>
          <Routes />
        </div>
      </IntlProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// firebase.messaging().onMessage((payload) => {
//   console.log("Payload in foreground: ", payload);

//   console.log("location : ", window.location.href);

//   var notificationTitle = payload.data.title;
//   var notificationOptions = {
//     body: payload.data.body,
//     data: payload.data,
//   };

//   var notification = new Notification(notificationTitle, notificationOptions);

//   notification.onclick = (event) => {
//     console.log("Event Data ", event.target.data);
//     if (event.target.data.messageType === "DISCUSSIONS") {
//       console.log("Directing it to ", event.target.data.chapterId);
//       if (!event.target.data.isMessageFromTutor) {
//         // window.open("https://test.backend.tutor.zotalabs.com/teacher/myCourses/modules/chapter/" + event.target.data.chapterId, "_self");
//         window.open(
//           appConfig +
//             "/teacher/myCourses/modules/chapter/" +
//             event.target.data.chapterId,
//           "_self"
//         );
//       } else {
//         // window.open("https://test.backend.tutor.zotalabs.com/student/myCourses/modules/chapter/" + event.target.data.chapterId, "_self");
//         window.open(
//           appConfig +
//             "/student/myCourses/modules/chapter/" +
//             event.target.data.chapterId,
//           "_self"
//         );
//       }
//     } else {
//       if (event.target.data.isMessageFromTutor) {
//         window.open("http://localhost:3000/teacher/messages", "_self");
//       } else {
//         window.open("http://localhost:3000/student/messages", "_blank");
//       }
//     }

//     notification.close();
//   };
// });

// firebase.messaging().onTokenRefresh((messaging) => {
//   messaging
//     .getToken()
//     .then((refreshedToken) => {
//       console.log("refreshedToken : ", refreshedToken);
//     })
//     .catch((err) => {
//       console.log("Unable to retrieve refreshed token ", err);
//     });
// });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
