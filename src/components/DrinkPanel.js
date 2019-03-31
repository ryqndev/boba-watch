import React, { Component } from 'react';
import {Button, Modal} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Add from './Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import './styles/history.css';

export class DrinkPanel extends Component {
    state =  {
        open: false,
        add: false
    }
    toggle = () => {
        this.setState(state => ({
            open: !state.open
        }));
    }
    toggleAdd = () => {
        this.setState(state => ({
            add: !state.add,
        }));
    }
    hasImage = () => {
        if(this.props.data.photo.trim() !== "" && this.props.data.photo !== "asdf" ){
            return  <img alt="drink" src={this.props.data.photo} />;
        }
    }
    /**
     * NOTE fetch should be the api endpoint to delete a certian drink
     */
    delete = () => {
        fetch("https://api.boba.watch/drinks/" + this.props.data.id + "/" + this.props.accessToken,{
        }).then((resp) => {this.props.getNewInfo();
        }).catch(err => { console.log(err)
        });
    }
    edit = () => {
        this.toggleAdd(this.delete);
    }
    render() {
        return (
        <div className="thaman-color">
            <Modal open={this.state.add} onBackdropClick={this.toggleAdd} >
                <div>
                    <Add toggleSelf={this.edit}/>
                </div>
            </Modal>
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
                    <Button onClick={this.edit}>EDIT</Button>
                    <Button onClick={this.delete}>DELETE</Button>
                </div>
            </Collapse>
        </div>
        )
    }
}

export default DrinkPanel
