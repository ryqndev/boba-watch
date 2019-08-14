import React, { Component } from 'react';
import {Button} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Utils from './textUtil.js';
import backend from './firebaseCalls';
import stats from './calculateStatistics';
import './styles/history.css';

export class DrinkPanel extends Component {
    state =  { open: false, add: false };
    toggle = () => { this.setState(state => ({ open: !state.open })) }
    toggleAdd = () => { this.setState(state => ({ add: !state.add })) }

    hasImage = () => {
        if(this.props.data.photo !== null && this.props.data.photo.trim() !== "" ){
            return  <img alt="drink" src={this.props.data.photo} />;
        }
    }
    /**
     * TODO : please fix this abomination
     */
    delete = () => {
        backend.drinks.delete(
            this.props.data.id,
            this.removeLocally
        );
    }
    /**
     * @function removeLocally
     * TODO create a function in calculate statistics that deals with recalculating metrics
     * from deleting something
     */
    removeLocally = () => {
        stats.deleteDrink(this.props.data.id);
        this.props.update();
        backend.user.updateStats();
    }
    /**
     * TODO: if implementing edit function ever again, uncomment below code
     */
    // edit = () => { this.toggleAdd(this.delete) }
    render() {
        let dDate = new Date(this.props.data.date);
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
            <Collapse in={this.state.open} className="drink-collapse">
                {/* {this.hasImage()} */}
                <p className="drink-label">
                    {this.props.data.name} 
                    <br />
                    <span>@{this.props.data.location}</span>
                </p>
                <p className="drink-description">
                    {this.props.data.description}
                </p>
                <p className="drink-date">
                    <span>on</span> {dDate.toDateString()}
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

export default DrinkPanel;
