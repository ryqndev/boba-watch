import Dexie from 'dexie';

const db = new Dexie('blogposts');

db.version(1).stores({
    blogposts: "&uid, date, likes, location, name, price"
});

