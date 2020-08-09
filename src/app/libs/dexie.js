import Dexie from 'dexie';
import {alertDefaultError} from '../libs/swal';
import {blogPostGetOptions} from '../defaults';

const db = new Dexie('blogposts');

db.version(1).stores({
    blogposts: "&id, uid, date, likes, location, name, price, fave, edited, published"
});

const add = (data, fave=0) => {
    return db.blogposts.put({fave: fave, ...data});
}
const setFave = (id, liked) => {
    return db.blogposts.update(id, {liked: liked ? 1 : 0});
}
const exists = (id) => {
    return new Promise((res, rej) => {
        db.blogposts.get(id, post => {post === undefined ? rej() : res(post)})
    });
}

const getFaves = () => {
    return new Promise(res => {
        db.blogposts.where('fave').equals(1).toArray(posts => {res(posts)});
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
    exists,
    setFave,
    getFaves,
    getFeed,
}