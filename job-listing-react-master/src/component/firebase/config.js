
import app from 'firebase/app'
import 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyAdKTmIoXZjCf7-2XLNvo7qKMkzgTWRDSE",
    authDomain: "job-listening-6afec.firebaseapp.com",
    projectId: "job-listening-6afec",
    storageBucket: "job-listening-6afec.appspot.com",
    messagingSenderId: "421816679020",
    appId: "1:421816679020:web:06d55efe85d814215c7649"
  };
  
  // Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firebase,firestore,app}