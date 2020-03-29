import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import FirebaseUser from '../../controller/backend';
import Utils from '../../components/textUtil';
import {useParams} from 'react-router-dom';
import {FeedItem} from '../Feed';
import LocationIcon from '@material-ui/icons/LocationOnRounded';
import Swal from 'sweetalert2';
import BobaImage from '../../../assets/logo-shadow.svg';
import './Blog.scss';

const Blog = () => {
    let { userid } = useParams();
    const {t} = useTranslation();
    const [posts, setPosts] = useState([]);
    const [location, setLocation] = useState("ARCADIA");
    const [bio, setBio] = useState("Just a boba girl in a boba world");
    const [photo, setPhoto] = useState(FirebaseUser.get.currentUser.user.photoURL);
    const [name, setName] = useState(FirebaseUser.get.currentUser.user.displayName);
    const stats = JSON.parse(localStorage.getItem('metrics'));
    useEffect(() => {
        (async() => {
            setPosts([]);
            setPhoto(BobaImage);
            setName("");
            let user = await FirebaseUser.blog.profile(userid);
            user = user.data();
            setBio(user.bio ?? "Just a boba person in a boba world");
            setName(user.name ?? "Boba Person");
            setPhoto(user.profile ?? "");
            setLocation(user.location ?? "Boba World");
            let entries = await FirebaseUser.publish.get.user(userid);
            let allPosts = [];
            entries.forEach(entry => {
                let data = {id: entry.id, ...entry.data()}
                allPosts.push(data);
            });
            setPosts(allPosts);
        })();
    }, [userid]);
    
    const deletePost = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Once you delete this you can't get it back!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((res) => {
            if (res.value) {
                FirebaseUser.publish.delete(id).then(async(res) => {
                    Swal.fire('Deleted!','Your file has been deleted.', 'success');
                    let entries = await FirebaseUser.publish.get.user(userid);
                    let allPosts = [];
                    entries.forEach(entry => {
                        let data = {id: entry.id, ...entry.data()}
                        allPosts.push(data);
                    });
                    setPosts(allPosts);
                }).catch(err => {
                    Swal.fire('Whoops!','Something went wrong while deleting', 'error');                    
                });
            }
        })
    }

    return (
        <div className="blog-page">
            <div className="blog-header"> <div className="icon"></div>PUBLIC PROFILE PREVIEW</div>
            <div className="user">
                <img src={photo} alt="avatar" />
                <h2>{name}</h2>
            </div>
            <div className="profile">
                <LocationIcon className="icon"/> {location}
                <p>{bio}</p>
            </div>
            <div className="stats">
                <p>DRINKS THIS MONTH</p> {stats.td}
                <p>DRINK AVERAGE</p> {t('$')}{Utils.toMoney(stats.ad)}
                <p>MONTHLY TOTAL</p> {t('$')}{Utils.toMoney(stats.tc)}
            </div>
            <h2 className="review"> <span>★</span> REVIEWS <span>★</span> </h2>
            <div className="content">
                {posts.map(post => (
                    <FeedItem key={post.id} place={post.location} {...post}>
                        <div className="item-controls">
                            <button onClick={() => {deletePost(post.id)}}>DELETE</button>
                        </div>
                    </FeedItem>
                ))}
            </div>
        </div>
    );
}

export default Blog;
