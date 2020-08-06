import Dexie from 'dexie';
import {alertDefaultError} from '../libs/swal';
import {blogPostGetOptions} from '../defaults';

const db = new Dexie('blogposts');

db.version(1).stores({
    blogposts: "&id, uid, date, likes, location, name, price, fave, edited, published"
});

const add = async(data, fave=0) => {
    return db.blogposts.put({fave: fave, ...data});
}

const getFaves = async(options) => {
    db.blogposts
    .where('fave').equals(1)
    .offset(options.offset || blogPostGetOptions.offset)
    .limit(options.limit || blogPostGetOptions.limit)
    .toArray(posts => {
        console.log(posts);
        return posts;
    });
}
const getFeed = async(options) => {
    db.blogposts
    .offset(options.offset || blogPostGetOptions.offset)
    .limit(options.limit || blogPostGetOptions.limit)
    .toArray(posts => {
        console.log(posts);
        return posts;
    });
}

export {
    add,
    getFaves,
    getFeed,
}