/* Firebase web config for project "ssc-board-prep".
   These values identify the project; they are NOT secrets. Data is protected by the Firestore
   security rules (firestore.rules): a signed-in student can only read/write users/{their own uid}/...
   Set apiKey to '' to run in offline "local accounts" mode (accounts live only in this browser). */
window.BACKEND = {
  firebase: {
    apiKey: "AIzaSyAfhhHfg00EDVRhH35904v4inrH28NOcEM",
    authDomain: "ssc-board-prep.firebaseapp.com",
    projectId: "ssc-board-prep",
    appId: "1:163756156943:web:09350d747b76c1c01adb7a"
  }
};
