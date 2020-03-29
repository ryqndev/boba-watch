import React, {useState, useEffect} from 'react';
import Utils from '../../components/textUtil.js';
import FirebaseUser from '../../controller/backend';
import {Card} from '../../components';
import { useTranslation } from 'react-i18next';
import {withRouter} from 'react-router-dom'
import HeartEmptyIcon from '@material-ui/icons/FavoriteBorderRounded';
import HeartFilledIcon from '@material-ui/icons/FavoriteRounded';
import Filter from 'bad-words';

let filter = new Filter();

const WithAvatar = ({uid, history, ...data}) => {
    const [person, setPerson] = useState(null);
    useEffect(() => {
        if(person !== null) return;
        (async() => {
            FirebaseUser.blog.profile(uid).then(res => {
                setPerson(res.data());
            }).catch(err => {console.log(err)});
        })();
    }, [uid, person]);
    const visitProfile = () => {
        history.push('/blog/' + uid);
    }
    return (
        <div className="feed-avatar">
            {person !== null && <div className="user" onClick={visitProfile}>
                <img src={person.profile} alt="avatar" />
                <h2>{filter.clean(person.name)}</h2>
            </div>}
            <FeedItem {...data}/>
        </div>
    );
}
const FeedItem = ({id, name, place, price, date, description, likes, children}) => {
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
                <p className="date">{(new Date(date).toDateString())}</p>
                <p className="description">{filter.clean(description)}</p>
                {children}
            </div>
        </Card>
    );
}


export default FeedItem;
export const FeedItemWithAvatar = withRouter(WithAvatar);