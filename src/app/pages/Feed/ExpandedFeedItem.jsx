import React from 'react';
import ExpandedDrinkDescription from '../History/ExpandedDrinkDescription';
import FirebaseUser from '../../controller/backend';
import {withRouter} from 'react-router-dom';
import Reviews from '../Blog/Reviews';
import './ExpandedFeedItem.scss';

const ExpandedFeedItem = ({show, person, name, place, description, date, uid, history}) => {
    return show && (
        <div className="expanded-feed-item--wrapper">
            <div className="user">
                <img src={person.profile} alt="avatar" onClick={() => {
                    history.push('/blog/' + uid);
                }}/>
                <h2>{person.name}</h2>
            </div>
            
            <div className="content">
                <ExpandedDrinkDescription
                    name={name}
                    location={place}
                    description={description}
                    date={new Date(date).toDateString()}    
                />
                
                <h2 className="review">
                    <span>★</span> OTHER REVIEWS <span>★</span>
                </h2>

                <Reviews 
                    ownerUID={uid}
                    currentUID={FirebaseUser.get.currentUser.user.uid}
                    initialDisplayCount={3}
                />
            </div>
        </div>
    );
}

export default withRouter(ExpandedFeedItem);
