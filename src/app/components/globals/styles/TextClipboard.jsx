import React, {useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {IconButton, Snackbar} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import './textclipboard.css';

const TextClipboard = ({className='', text}) => {
    const [copiedNotification, setCopiedNotification] = useState(false);
    const closeSnackbar = () => {
        setCopiedNotification(!copiedNotification);
    };
    const copy = () => {
        if (navigator.share) {
            navigator.share({
                title: 'My Boba Watch Profile',
                text: 'Check out my boba spending!',
                url: text,
            }).catch(err => {
                setCopiedNotification(true);
            })
        }else{
            setCopiedNotification(true);
        }
    }
    return (
        <div className={`clipboard ${className}`}>
            <div className="clipboard-text" id="copy-me">
                {text}
            </div>
            <CopyToClipboard text={text} >
                <IconButton style={{padding: 0}} className="clipboard-icon" onClick={copy}>
                    <FileCopyIcon style={{fontSize: 14}}/>
                </IconButton>
            </CopyToClipboard>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={copiedNotification}
                autoHideDuration={4000}
                onClose={closeSnackbar}
                message={<span>Link Copied!</span>}
            />
        </div>
    );
}

export default TextClipboard;
