import * as firebase from 'firebase/app'
import 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'
import 'firebase/messaging'

var config = {
    
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: "geeks-talk-thursday-209114.firebaseapp.com",
    projectId: "geeks-talk-thursday-209114",
    appId: process.env.VUE_APP_FIREBASE_APP_ID,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_ID,

  }; // 4. Get Firebase 
  firebase.initializeApp(config);

  export default firebase