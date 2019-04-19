import React, { Component } from 'react';
import './styles/textclipboard.css';
import {IconButton} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';

export class TextClipboard extends Component {
    render() {
        return (
        <div className="clipboard">
            <div className="clipboard-text">
                {this.props.text}
            </div>
            <IconButton style={{padding: 0}} className="clipboard-icon">
                <FileCopyIcon style={{fontSize: 14}}/>
            </IconButton>
        </div>
        )
    }
}

export default TextClipboard;
