// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDauIj3GP5Hy2Nac0T_T_GFqksrPCqm4aA",
  authDomain: "fir-firebase-login-bdc79.firebaseapp.com",
  projectId: "fir-firebase-login-bdc79",
  storageBucket: "fir-firebase-login-bdc79.appspot.com",
  messagingSenderId: "213043241916",
  appId: "1:213043241916:web:ffea0358bfdc9dc5aa01b9",
  measurementId: "G-FSN4C9C5S7"
};

export const appVersion = '0.0.1';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);