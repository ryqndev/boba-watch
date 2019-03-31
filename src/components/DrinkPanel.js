import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
    render() {
        return (
        <div>
            <div className="history-drink-label" onClick={this.toggle}>
                <p className="drink-place">{this.props.data.location.length > 13 ? this.props.data.location.substr(0, 10) + "..." : this.props.data.location }</p>
                <p className="drink-price">${parseInt(this.props.data.price/100) + '.' + (this.props.data.price % 100 < 10 ? "0" + this.props.data.price % 100 : this.props.data.price % 100)}</p>
                <ExpandMoreIcon />
                <p className="drink-name">{this.props.data.name.length > 13 ? this.props.data.name.substr(0, 10) + "..." : this.props.data.name }</p>
                <p className="drink-time">{(new Date(this.props.data.date)).toDateString().substr(4)}</p>
            </div>
            <Collapse in={this.state.open}>
                <img alt="drink" src="https://images.pexels.com/photos/540533/pexels-photo-540533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                <p className="drink-description">{JSON.stringify(new Date(this.props.data.date))}</p>
            </Collapse>
            <hr className="thaman-color"/>
        </div>
        )
    }
}

export default DrinkPanel
