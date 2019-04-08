import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import DrinkPanel from './DrinkPanel';
import Utils from './textUtil.js';
import './styles/history.css';

export class History extends Component {
    state = {
        drinks: [<Typography variant="h3" key={1}>No Drinks</Typography>],
        sum: 0
    }
    componentDidMount = () => {
        this.retrieveHistory();  
    };
    retrieveHistory = () => {
        let drinks = JSON.parse(localStorage.getItem('drinksList'));
        this.generate(drinks.map(id => JSON.parse(localStorage.getItem(id)) ));
    }
    generate = (drinks) => {
        let sum = 0;
        let newDrinks = drinks.map((e, i) => {
            sum += e['price'];
            return (<DrinkPanel key={i} data={e} getNewInfo={this.retrieveHistory} accessToken={this.props.accessToken}/>);
        });
        this.setState({
            drinks: newDrinks,
            sum: sum
        });
    };
    
    render() {
        return (
        <div className="history-page">
            <Typography variant="h3"> Monthly Spending</Typography>
            <div id="history-spending">
                {this.state.drinks}
            </div>
            <Typography variant="h3" className="history-total"> <span>Monthly Total:</span> ${Utils.toMoney(this.state.sum)} </Typography>
        </div>
        )
    }
}

export default History;
