import React, {useState, useEffect, useContext} from 'react';
import {database, getUserBlog} from '../../libs/firestore';
import useMetrics from '../../controller/hooks/useMetrics';
import StatsDisplay from './Stats';
import ReviewsDisplay from './Reviews';
import {useParams} from 'react-router-dom';
import LocationIcon from '@material-ui/icons/LocationOnRounded';
import BobaImage from '../../../assets/logo-shadow.svg';
import Filter from 'bad-words';
import './Blog.scss';
import Text from '../../components/globals/styles/Text';
import AuthUserContext from '../../controller/contexts/AuthUserContext';
import {
    alertDefaultError,
    alertBioUpdateSuccess,
    alertLocationUpdateSuccess,
    promptBioUpdate,
    promptLocationUpdate,
} from '../../libs/swal';

import {blog as defaultBlog} from '../../defaults';
import ProfileSharingToggle from './ProfileSharingToggle';

let filter = new Filter();

const Blog = () => {
    const {userid} = useParams();
    const stats = useMetrics(userid);
    const [authUser] = useContext(AuthUserContext);
    const [location, setLocation] = useState("---");
    const [bio, setBio] = useState(defaultBlog.bio);
    const [photo, setPhoto] = useState(authUser.photoURL);
    const [name, setName] = useState(authUser.displayName);
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    useEffect(() => {
        setPhoto(BobaImage);
        setName("Loading...");
        setIsOwnProfile(userid === authUser.uid);
        if(userid === undefined) return;
        let isMounted = true;
        (async() => {
            try{
                let user = await getUserBlog(userid);
                user = user.data();
                if(!isMounted) return;
                setBio(filter.clean(user?.bio ?? defaultBlog.bio));
                setName(user.name ?? defaultBlog.name);
                setPhoto(user.profile ?? defaultBlog.photo);
                setLocation(filter.clean(user?.location ?? defaultBlog.location));
            }catch{
                if(!isMounted) return;
                setBio("This person does not exist. This could either be an error, a bug, or more likely, the user has privated their profile.");
                setName("Who dis?");
                setPhoto(BobaImage);
                setLocation("Not in Boba World :(");
            }
        })();
        return () => {
            isMounted = false;
        }
    }, [authUser, userid]);

    const editProfile = async(prompt, alert, setState, key) => {
        if(!isOwnProfile) return;
        const { value: userInput } = await prompt();
        if(userInput){
            database.collection(`users/${authUser.uid}/blog`).doc('user').update({[key]: userInput}).then(() => {
                setState(userInput);
                alert();
            }).catch(alertDefaultError);
        }
    }

    return (
        <div className="blog-page">
            <div className="blog-header"> <div className="icon"></div>PUBLIC PROFILE PREVIEW</div>
            <div className="user">
                <img src={photo} alt=" " />
                <h2><Text defaultKey="Loading...">{name}</Text></h2>
            </div>
            <div className="profile">
                <LocationIcon className="icon" onClick={() => {editProfile(promptLocationUpdate, alertLocationUpdateSuccess, setLocation, 'location')}}/> <Text>{location}</Text>
                <p onClick={() => {editProfile(promptBioUpdate, alertBioUpdateSuccess, setBio, 'bio')}}><Text>{bio}</Text></p>
                {isOwnProfile && (<ProfileSharingToggle />)}
            </div>

            <StatsDisplay
                totalDrinksPurchased={stats.ctd}
                averageDrinkCost={stats.cad}
                totalSpent={stats.ctc} 
            />

            <h2 className="review">
                <span>★</span> REVIEWS <span>★</span>
            </h2>

            <div className="reviews-holder">
                <ReviewsDisplay ownerUID={userid} />
            </div>
        </div>
    );
}

export default Blog;