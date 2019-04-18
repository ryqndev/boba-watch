import React, { Component } from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import swal from 'sweetalert';
import Utils from './textUtil.js';
import './styles/history.css';

export class DrinkPanel extends Component {
    state =  {
        open: false,
        add: false
    }
    toggle = () => {
        this.setState(state => ({ open: !state.open }));
    }
    toggleAdd = () => {
        this.setState(state => ({ add: !state.add }));
    }
    hasImage = () => {
        if(this.props.data.photo !== null && this.props.data.photo.trim() !== "" && this.props.data.photo !== "asdf" ){
            return  <img alt="drink" src={this.props.data.photo} />;
        }
    }
    /**
     * TODO: delete should update localstorage
     */
    delete = () => {
        axios.post("https://api.boba.watch/drinks/delete/" + this.props.data.id + "/" + this.props.accessToken)
        .then((resp) => { this.props.getNewInfo();})
        .catch(err => { swal('Error!', `Couldn't delete your drink. Try again later!`, 'error') });
    }
    edit = () => {
        this.toggleAdd(this.delete);
    }
    /**
     * TODO: if implementing edit function ever again, uncomment below code
     */
    render() {
        return (
        <div className="thaman-color">
            {/* <Modal open={this.state.add} onBackdropClick={this.toggleAdd} >
                <div>
                    <Add toggleSelf={this.edit}/>
                </div>
            </Modal> */}
            <div className="history-drink-label" onClick={this.toggle}>
                <p className="drink-place">
                    {this.props.data.location.length > 13
                        ? this.props.data.location.substr(0, 10) + "..."
                        : this.props.data.location }
                </p>
                <p className="drink-price">
                    ${Utils.toMoney(this.props.data.price)}
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
                {/* {this.hasImage()} */}
                <p className="drink-description">
                    {this.props.data.description}
                    {JSON.stringify(new Date(this.props.data.date))}
                </p>

                <div className="drink-options">
                    {/* <Button onClick={this.edit}>EDIT</Button> */}
                    <Button onClick={this.delete}>DELETE</Button>
                </div>
            </Collapse>
        </div>
        )
    }
}

export default DrinkPanel
