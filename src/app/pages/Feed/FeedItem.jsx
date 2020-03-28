import React, {useState, useEffect} from 'react';
import Utils from '../../components/textUtil.js';
import FirebaseUser from '../../controller/backend';
import {Card} from '../../components';
import { useTranslation } from 'react-i18next';

const FeedItemWithAvatar = ({uid, ...data}) => {

    const [person, setPerson] = useState(null);
    useEffect(() => {
        if(person !== null) return;
        (async() => {
            FirebaseUser.blog.profile(uid).then(res => {
                setPerson(res.data());
            }).catch(err => {console.log(err)});
        })();
    }, [uid, person]);
    return (
        <div>
            {person !== null && <div className="user">
                <img src={person.profile} alt="avatar" />
                <h2>{person.name}</h2>
            </div>}
            <FeedItem {...data}/>
        </div>
    );
}
const FeedItem = ({name, location, price, date, description}) => {
    const {t} = useTranslation();
    return (
        <Card className="feed-item">
            <div className="header">
                {name}
            </div>
            <div className="content">
                <p className="location">{location}</p>
                <p className="price">{t('$')}{Utils.toMoney(price)}</p>
                <p className="date">{(new Date(date).toDateString())}</p>
                <p className="description">{description}</p>
            </div>
        </Card>
    );
}


export default FeedItem;
export {FeedItemWithAvatar};