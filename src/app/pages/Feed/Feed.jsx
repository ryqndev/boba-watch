import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Popular from './Popular';
import {Modal} from '../../components';
import ExpandedFeedItem from './ExpandedFeedItem';
import './Feed.scss';

const Feed = () => {
    const {t} = useTranslation();
    const [expandedFeedItem, setExpandedFeedItem] = useState({show: false});
    const [popularDisplayCount, setPopularDisplayCount] = useState(10);
    return (
        <div className="feed-page">
            <div className="feed-header">
                <div className="icon"></div>
                {t("EXPLORE")}
            </div>
            <div className="content">
                <Popular 
                    expand={setExpandedFeedItem} 
                    displayCount={popularDisplayCount} 
                    setDisplayCount={setPopularDisplayCount}
                />
                <div className="feed-end">No more posts to show</div>
            </div>
            <Modal open={expandedFeedItem.show} setOpen={(show) => {setExpandedFeedItem({show: show})}}>
                <ExpandedFeedItem {...expandedFeedItem}/>
            </Modal>
        </div>
    );
}

export default Feed;
