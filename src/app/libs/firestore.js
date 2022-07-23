import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	Timestamp,
	connectFirestoreEmulator,
} from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { alertDefaultError } from '../libs/swal';
import * as firebaseui from 'firebaseui';
import { subWeeks, subMonths } from 'date-fns';

const firebaseConfig = {
	apiKey: 'AIzaSyBePNJQYVteyh1Ll9fqnXbXc-S8fmJlbTQ',
	authDomain: 'boba-watch-firebase.firebaseapp.com',
	databaseURL: 'https://boba-watch-firebase.firebaseio.com',
	projectId: 'boba-watch-firebase',
	storageBucket: 'boba-watch-firebase.appspot.com',
	messagingSenderId: '674375234614',
	appId: '1:674375234614:web:fdaf98c291204b9c',
	measurementId: 'G-C2DYVHCWDR',
};
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const auth = getAuth(app);

const analytics = getAnalytics(app);
const storage = getStorage(app);
const ui =
	firebaseui.auth.AuthUI.getInstance() ||
	new firebaseui.auth.AuthUI(getAuth(app));

if (window.location.hostname === 'localhost') {
	connectFirestoreEmulator(database, 'localhost', 9000);
	connectAuthEmulator(auth, 'http://localhost:9099');
}

// database.enablePersistence().catch(err => { console.error(err) });

const logout = () => {
	auth.signOut()
		.then(function () {
			logEvent(analytics, 'logout');
			let theme = localStorage.getItem('theme');
			let lang = localStorage.getItem('i18n');
			localStorage.clear();
			localStorage.setItem('theme', theme);
			localStorage.setItem('i18n', lang);
		})
		.catch(alertDefaultError);
};

const publishGetUser = (uid, limit = 5, callback) => {
	return database
		.collection('blogs')
		.where('uid', '==', uid)
		.orderBy('date', 'desc')
		.limit(limit)
		.onSnapshot(callback);
};
const publishGetFeed = (
	limit = 1,
	orderBy = 'published',
	time = 'all',
	callback
) => {
	let date = new Date();
	switch (time) {
		case 'week':
			date = subWeeks(date, 1);
			break;
		case 'month':
			date = subMonths(date, 1);
			break;
		case 'all':
		default:
			date = new Date(0);
			break;
	}
	date = Timestamp.fromDate(date);
	if (orderBy === 'published')
		return database
			.collection('blogs')
			.orderBy('published', 'desc')
			.where('published', '>=', date)
			.limit(limit)
			.onSnapshot(callback);
	return database
		.collection('blogs')
		.orderBy('published')
		.where('published', '>=', date)
		.orderBy(orderBy, 'desc')
		.limit(limit)
		.onSnapshot(callback);
};
const getFeed = async (limit = 1, startAfter = 0) => {
	return database
		.collection('blogs')
		.orderBy('published')
		.startAfter(startAfter)
		.limit(limit)
		.get();
};
const deleteBlogPost = async blogid => {
	return database.collection('blogs').doc(blogid).delete();
};
const getBlogPost = async blogid => {
	return database.collection('blogs').doc(blogid).get();
};
const getUserStats = uid => {
	return database.collection(`users/${uid}/user`).doc('stats').get();
};
const getUserBlog = async uid => {
	return database.collection(`users/${uid}/blog`).doc('user').get();
};

export {
	ui,
	logout,
	database,
	storage,
	analytics,
	auth,
	publishGetUser,
	publishGetFeed,
	deleteBlogPost,
	getBlogPost,
	getUserStats,
	getUserBlog,
	getFeed,
};
