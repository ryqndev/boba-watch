import React, { Component } from 'react';
import {Button} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import './styles/history.css';

export class DrinkPanel extends Component {
    state =  {
        open: false
    }
    toggle = () => {
        this.setState(state => ({
            open: !state.open
        }));
    }
    hasImage = () => {
        if(this.props.data.photo.trim() !== "" && this.props.data.photo !== "asdf" ){
            return  <img alt="drink" src={this.props.data.photo} />;
        }
    }
    render() {
        return (
        <div className="thaman-color">
            <div className="history-drink-label" onClick={this.toggle}>
                <p className="drink-place">
                    {this.props.data.location.length > 13 
                        ? this.props.data.location.substr(0, 10) + "..." 
                        : this.props.data.location }
                </p>
                <p className="drink-price">
                    ${parseInt(this.props.data.price/100) + '.' + 
                    (this.props.data.price % 100 < 10 
                        ? "0" + this.props.data.price % 100 
                        : this.props.data.price % 100)
                    }
                </p>
                <div className="expand-icon">
                    {this.state.open ? <ExpandLessIcon /> : <ExpandMoreIcon/>}
                </div>
                <p className="drink-name">
                    {this.props.data.name.length > 13 
                        ? this.props.data.name.substr(0, 10) + "..." 
                        : this.props.data.name }
                </p>
                <p className="drink-time">
                    {(new Date(this.props.data.date)).toDateString().substr(4)}
                </p>
            </div>
            <Collapse in={this.state.open}>
                {this.hasImage()}
                <p className="drink-description">
                    {JSON.stringify(new Date(this.props.data.date))}
                </p>

                <div className="drink-options">
                    <Button>EDIT </Button>
                    <Button>DELETE </Button>
                </div>
            </Collapse>
        </div>
        )
    }
}

export default DrinkPanel
