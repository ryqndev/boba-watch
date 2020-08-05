import React, {useState, useEffect} from 'react';
import Toggle from 'react-toggle';
import {useTranslation} from 'react-i18next';
import FirebaseUser from '../../controller/backend';
import {deleteBlogPost, publishGetUser, getUserBlog, getUserStats} from '../../libs/firestore';
import Utils from '../../components/textUtil';
import {useParams} from 'react-router-dom';
import {FeedItem} from '../Feed';
import LocationIcon from '@material-ui/icons/LocationOnRounded';
import {
    alertDefaultError,
    alertBlogPostDeletedSuccess,
    alertBioUpdateSuccess,
    alertLocationUpdateSuccess,
    promptBioUpdate,
    promptLocationUpdate,
    confirmBlogPostDelete
} from '../../libs/swal';
import {TextClipboard, Collapse} from '../../components';
import BobaImage from '../../../assets/logo-shadow.svg';
import {
    stats as defaultStats,
    blog as defaultBlog,
} from '../../defaults';
import './Blog.scss';
import Filter from 'bad-words';

let filter = new Filter();

const toggleProfileSharing = (callback) => {
    let data = FirebaseUser.get.currentUser.profile;

    FirebaseUser.user.update({...data, sharing: !data.sharing}, () => {
        data.sharing = !data.sharing;
        callback(data.sharing);
    });
}

const Blog = () => {
    const {userid} = useParams();
    const {t} = useTranslation();
    const [posts, setPosts] = useState([]);
    const [location, setLocation] = useState("---");
    const [bio, setBio] = useState(defaultBlog.bio);
    const [photo, setPhoto] = useState(FirebaseUser.get.currentUser.user.photoURL);
    const [name, setName] = useState(FirebaseUser.get.currentUser.user.displayName);
    const [stats, setStats] = useState(JSON.parse(localStorage.getItem('metrics')));
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [profileSharing, setProfileSharing] = useState(FirebaseUser.get.currentUser.profile.sharing);

    useEffect(() => {
        setIsOwnProfile(userid === FirebaseUser.get.currentUser.user.uid);
        (async() => {
            setPosts([]);
            setPhoto(BobaImage);
            setName("Loading...");
            try{
                let stats = await getUserStats(userid);
                stats = stats.data();
                setStats(stats);
                let user = await getUserBlog(userid);
                user = user.data();
    
                setBio(filter.clean(user.bio ?? defaultBlog.bio));
                setName(user.name ?? defaultBlog.name);
                setPhoto(user.profile ?? defaultBlog.photo);
                setLocation(filter.clean(user.location ?? defaultBlog.location));
                let entries = await publishGetUser(userid);
                let allPosts = [];
                entries.forEach(entry => {
                    let data = {id: entry.id, ...entry.data()}
                    allPosts.push(data);
                });
                setPosts(allPosts);
            }catch{
                setBio("This person does not exist. This could either be an error, a bug, or more likely, the user has privated their profile.");
                setName("Who dis?");
                setPhoto(BobaImage);
                setLocation("Not in Boba World :(");
                setStats(defaultStats);
            }
            
        })();
    }, [userid]);
    
    const deletePost = (id) => {
        confirmBlogPostDelete().then((res) => {
            if (res.value){
                deleteBlogPost(id).then(async(res) => {
                    alertBlogPostDeletedSuccess();
                    let entries = await publishGetUser(userid);
                    let allPosts = [];
                    entries.forEach(entry => {
                        let data = {id: entry.id, ...entry.data()}
                        allPosts.push(data);
                    });
                    setPosts(allPosts);
                }).catch(alertDefaultError);
            }
        })
    }
    const triggerLocationEdit = async() => {
        if(!isOwnProfile) return;
        const { value: location } = await promptLocationUpdate();
        if(location){
            FirebaseUser.blog.setProfile({location: location}).then(() => {
                setLocation(location);
                alertLocationUpdateSuccess();
            }).catch(alertDefaultError);
        }
    }
    const triggerBioEdit = async() => {
        if(!isOwnProfile) return;
        const { value: bio } = await promptBioUpdate();
        if(bio){
            FirebaseUser.blog.setProfile({bio: bio}).then(() => {
                setBio(bio);
                alertBioUpdateSuccess();
            }).catch(alertDefaultError);
        }
    }
    return (
        <div className="blog-page">
            <div className="blog-header"> <div className="icon"></div>PUBLIC PROFILE PREVIEW</div>
            <div className="user">
                <img src={photo} alt="avatar" />
                <h2>{name}</h2>
            </div>
            <div className="profile">
                <LocationIcon className="icon" onClick={triggerLocationEdit}/> {location}
                <p onClick={triggerBioEdit}>{bio}</p>
                {isOwnProfile && (
                    <div className="user-share ">
                        <div className="user-share-profile">
                            {t('make profile public')}: 
                            <Toggle
                                defaultChecked={profileSharing}
                                onClick={() => {toggleProfileSharing(setProfileSharing)}}
                                label={t('make profile public')}
                            />
                            <Collapse className="user-share-toggle-grid" open={profileSharing}>
                                <TextClipboard
                                    text={`https://share.boba.watch/#/${FirebaseUser.get.currentUser.user.uid}`}
                                />
                            </Collapse> 
                        </div>
                    </div>
                )}
            </div>

            <div className="stats">
                <p>DRINKS PURCHASED</p> {stats.ctd}
                <p>DRINK AVERAGE</p> {t('$')}{Utils.toMoney(stats.cad)}
                <p>TOTAL SPENT</p> {t('$')}{Utils.toMoney(stats.ctc)}
            </div>
            <h2 className="review"> <span>★</span> REVIEWS <span>★</span> </h2>
            <div className="content">
                {posts.length !== 0
                    ? posts.map(post => (
                        <FeedItem key={post.id} place={post.location} {...post}>
                            {isOwnProfile && (
                                <div className="item-controls">
                                    <button onClick={() => {deletePost(post.id)}}>DELETE</button>
                                </div>)
                            }
                        </FeedItem>))
                    : <h3 key="@ryqndev/empty">No Published Reviews</h3>
                }
            </div>
        </div>
    );
}

export default Blog;