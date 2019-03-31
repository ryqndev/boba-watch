import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import DrinkPanel from './DrinkPanel';
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
        fetch("https://api.boba.watch/drinks/user/1",{
        }).then((resp) => { return resp.json();
        }).then((resp) => { this.generate(resp);
        }).catch(err => { console.log(err)
        });
    }
    generate = (drinks) => {
        let sum = 0;
        drinks.forEach(e => {
            sum += e['price'];
        });
        let newDrinks = drinks.map((e, i) => {
            return (<DrinkPanel key={i} data={e}/>);
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
            <Typography variant="h3" className="history-total"> <span>Monthly Total:</span> ${parseInt(this.state.sum/100) + '.' + (this.state.sum % 100 < 10 ? "0" + this.state.sum % 100 : this.state.sum % 100)} </Typography>
        </div>
        )
    }
}

export default History;
