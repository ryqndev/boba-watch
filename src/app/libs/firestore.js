import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import {alertDefaultError} from '../libs/swal';
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
    apiKey: "AIzaSyBePNJQYVteyh1Ll9fqnXbXc-S8fmJlbTQ",
    authDomain: "boba-watch-firebase.firebaseapp.com",
    databaseURL: "https://boba-watch-firebase.firebaseio.com",
    projectId: "boba-watch-firebase",
    storageBucket: "boba-watch-firebase.appspot.com",
    messagingSenderId: "674375234614",
    appId: "1:674375234614:web:fdaf98c291204b9c",
    measurementId: "G-C2DYVHCWDR"
};
firebase.initializeApp(firebaseConfig);

let database, 
    analytics = firebase.analytics(), 
    ui = firebaseui.auth.AuthUI.getInstance() 
        || new firebaseui.auth.AuthUI(firebase.auth());

const init = () => {
    database = firebase.firestore(); 
    database.enablePersistence().catch(err => {console.error(err)});
}
const logout = () => {
    firebase.auth().signOut().then(function() {
        analytics.logEvent('logout');
        let theme = localStorage.getItem('theme');
        localStorage.clear();
        localStorage.setItem('theme', theme);
        window.location.reload();
    }).catch(alertDefaultError);      
}
const publishGetUser = (uid, limit=6) => {
    return database.collection('blogs').where('uid', '==', uid).orderBy('date', 'desc').limit(limit).get();
}
const publishGetFeed = (callback, limit=1) => {
    return database.collection('blogs').orderBy('published', 'desc').limit(limit).onSnapshot(callback);
}
const getFeed = async(limit=1, startAfter=0) => {
    return database.collection('blogs').orderBy('published').startAfter(startAfter).limit(limit).get();
}
const deleteBlogPost = async(blogid) => {
    return database.collection('blogs').doc(blogid).delete();
}
const getBlogPost = async(blogid) => {
    return database.collection('blogs').doc(blogid).get();
}
const getUserStats = async(uid) => {
    return database.collection(`users/${uid}/user`).doc('stats').get();
}
const getUserBlog = async(uid) => {
    return database.collection(`users/${uid}/blog`).doc('user').get();
}
const getFaves = async(uid, limit=1, startAfter=0) => {
    return database.collection(`users/${uid}/user/profile/liked`).orderBy('liked').startAfter(startAfter).limit(limit).get();
}

export {
    ui,
    firebase,
    init,
    logout,
    database,
    analytics,
    publishGetUser,
    publishGetFeed,
    deleteBlogPost,
    getBlogPost,
    getUserStats,
    getUserBlog,
    getFaves,
    getFeed,
}