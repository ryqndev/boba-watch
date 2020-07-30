import React, {useState, useEffect} from 'react';
import Utils from '../../components/textUtil.js';
import FirebaseUser from '../../controller/backend';
import {Card} from '../../components';
import {useTranslation} from 'react-i18next';
import {withRouter} from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component';
import {ReactComponent as StarEmptyIcon} from './star_empty.svg';
import {ReactComponent as StarFilledIcon} from './star_filled.svg';
import HeartEmptyIcon from '@material-ui/icons/FavoriteBorderRounded';
import HeartFilledIcon from '@material-ui/icons/FavoriteRounded';
import Filter from 'bad-words';

let filter = new Filter();

const WithAvatar = ({uid, history, ...data}) => {
    const [person, setPerson] = useState(null);
    useEffect(() => {
        if(person !== null) return;
        (async() => {
            FirebaseUser.blog.getProfile(uid).then(res => {
                setPerson(res.data());
            }).catch(err => {console.log(err)});
        })();
    }, [uid, person]);
    const visitProfile = () => {
        history.push('/blog/' + uid);
    }
    return (
        <div className="feed-avatar">
            <div className="user" onClick={visitProfile}>
                {/* Best way to display blank image is using a base64 string. Other implementations make extra get req or broken html */}
                <img src={person?.profile ?? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="} alt="avatar" />
                <h2>{filter.clean(person?.name ?? "Boba Bro")}</h2>
            </div>
            <FeedItem {...data}/>
        </div>
    );
}
const FeedItem = ({id, name, place, price, date, description, likes, rating, children}) => {
    const {t} = useTranslation();
    const [liked, setLiked] = useState(false);
    const [likeDisplay, setLikeDisplay] = useState(likes);
    const toggleFavorite = () => {
        FirebaseUser.blog.like(id, !liked).then(() => {
            setLikeDisplay(likeDisplay + (liked ? -1 : 1));
            setLiked(!liked);
        });
    }

    return (
        <Card className="feed-item">
            <div className="header">
                <span>{filter.clean(name)}</span>
                <p className="favorite-amount">
                    {(likeDisplay ?? 0) > 999 ? ((likeDisplay / 100) >> 0) + 'k' : (likeDisplay ?? 0)}
                </p>
                <div className="favorite" onClick={toggleFavorite}>
                    {liked ? <HeartFilledIcon /> : <HeartEmptyIcon/>}
                </div>
            </div>
            <div className="item-content">
                <p className="location">{filter.clean(place)}</p>
                <p className="price">{t('$')}{Utils.toMoney(price)}</p>
                {(rating !== null && rating !== undefined) && 
                    <div className="ratings-holder">
                        <StarRatingComponent 
                            name="rating" 
                            starCount={5}
                            value={rating}
                            renderStarIcon={(i, v) => (i <= v ? <StarFilledIcon /> : <StarEmptyIcon />)}
                        />
                    </div>
                }
                <p className="date">{(new Date(date).toDateString())}</p>
                <p className="description">{filter.clean(description)}</p>
                {children}
            </div>
        </Card>
    );
}


export default FeedItem;
export const FeedItemWithAvatar = withRouter(WithAvatar);