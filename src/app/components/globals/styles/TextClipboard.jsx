import React from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import './textclipboard.css';
import {alertLinkCopiedSuccess} from '../../../libs/swal';

const TextClipboard = ({className='', text}) => {
    const copy = () => {
        navigator.clipboard.writeText(text);
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
            <button className="clipboard-icon" onClick={copy}>
                <FileCopyIcon style={{fontSize: 14}}/>
            </button>
        </div>
    );
}

export default TextClipboard;
