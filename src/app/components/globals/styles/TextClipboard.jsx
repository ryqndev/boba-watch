import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import './textclipboard.css';
import {alertLinkCopiedSuccess} from '../../../libs/SwalAlerts';

const TextClipboard = ({className='', text}) => {
    const copy = () => {
        if (navigator.share) {
            navigator.share({
                title: 'My Boba Watch Profile',
                text: 'Check out my boba spending!',
                url: text,
            }).catch(err => {
            });
        }else{
            alertLinkCopiedSuccess();
        }
    }
    return (
        <div className={`clipboard ${className}`}>
            <div className="clipboard-text" id="copy-me">
                {text}
            </div>
            <CopyToClipboard text={text} >
                <button className="clipboard-icon" onClick={copy}>
                    <FileCopyIcon style={{fontSize: 14}}/>
                </button>
            </CopyToClipboard>
        </div>
    );
}

export default TextClipboard;
