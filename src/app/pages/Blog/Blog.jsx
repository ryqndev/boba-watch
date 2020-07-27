import React, {useState, useEffect} from 'react';
import Toggle from 'react-toggle';
import {useTranslation} from 'react-i18next';
import FirebaseUser from '../../controller/backend';
import Utils from '../../components/textUtil';
import {useParams} from 'react-router-dom';
import {FeedItem} from '../Feed';
import LocationIcon from '@material-ui/icons/LocationOnRounded';
import Swal from 'sweetalert2';
import {TextClipboard, Collapse} from '../../components';
import BobaImage from '../../../assets/logo-shadow.svg';
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
    const [bio, setBio] = useState("Just a boba girl in a boba world");
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
                let stats = await FirebaseUser.blog.stats(userid);
                stats = stats.data();
                setStats(stats);
                let user = await FirebaseUser.blog.getProfile(userid);
                user = user.data();
    
                setBio(filter.clean(user.bio ?? "Just a boba person in a boba world"));
                setName(user.name ?? "Boba Person");
                setPhoto(user.profile ?? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
                setLocation(filter.clean(user.location ?? "Boba World"));
                let entries = await FirebaseUser.publish.get.user(userid);
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
                setStats({
                    "ad": 0,
                    "cad": 0,
                    "ctc": 0,
                    "ctd": 0,
                    "d": "[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]",
                    "fn": "Who dis?",
                    "tc": 0,
                    "td": 0
                });
            }
            
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
                    Swal.fire('Deleted!','Your post has been deleted.', 'success');
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
    const triggerLocationEdit = async() => {
        if(!isOwnProfile) return;
        const { value: location } = await Swal.fire({
            title: 'Change location',
            input: 'text',
            inputPlaceholder: 'Where I am now...',
            inputAttributes: {
                maxLength: 20
            }
        });
        if(location){
            FirebaseUser.blog.setProfile(
                {location: location}
            ).then(() => {
                setLocation(location);
                Swal.fire('Done!', 'Your public location has been changed.', 'success');
            }).catch((err) => {
                console.log(err);
                Swal.fire('Whoops!', 'Something went wrong... Try again later.', 'error');
            });
        }
    }
    const triggerBioEdit = async() => {
        if(!isOwnProfile) return;
        const { value: bio } = await Swal.fire({
            title: 'Edit bio',
            input: 'textarea',
            inputPlaceholder: 'About me...',
            inputAttributes: {
                maxLength: 350
            }
        });
        if(bio){
            FirebaseUser.blog.setProfile(
                {bio: bio}
            ).then(() => {
                setBio(bio);
                Swal.fire('Done!', 'Your bio has been updated.', 'success');
            }).catch((err) => {
                console.log(err);
                Swal.fire('Whoops!', 'Something went wrong... Try again later.', 'error');
            });
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
                    : <h3 key="empty">No Published Reviews</h3>
                }
            </div>
        </div>
    );
}

export default Blog;