import Dexie from 'dexie';
import {alertDefaultError} from '../libs/swal';
import {blogPostGetOptions} from '../defaults';

const db = new Dexie('blogposts');

db.version(1).stores({
    blogposts: "&id, uid,date, likes, location, name, price, fave"
});

const add = async(data) => {
    db.blogposts.put(data).then(() => {
        console.log(data.id);
        return db.blogposts.get(data.id);
    }).then(data => {
        console.log('data stored', data);
    }).catch(err => {
        alertDefaultError(err);
    });
}

const get = async(options) => {
    db.blogposts
    .where('fave').equalsIgnoreCase('true')
    .offset(options.offset || blogPostGetOptions.offset)
    .limit(options.limit || blogPostGetOptions.limit)
    .toArray(posts => {
        console.log(posts);
        return posts;
    });
}

export {
    add,
    get
}