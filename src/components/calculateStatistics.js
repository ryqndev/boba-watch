/**
 * @file calculateStatistics.js
 * @copyright Ryan Yang 2019
 * @summary - A set of functions to help calculate metrics for user's drink objects
 */

/**
 * @function getDefaultMetrics - returns an emtpy metrics object. Called during
 * metric recalcuation when starting from nothing. 
 * @note - drinks member should be a 2d array of 168 objects (7x24) of day by time
 * Array(7).fill(Array(24).fill(0)) creates 7 references to the same array and therefore
 * will not work as intended
 */
function getDefaultMetrics(){
    let metrics = {
        'numDrinks': 0,
        'totalCost': 0,
        'drinkAvg': 0,
        'drinks': Array(7)
    }
    for(let i = 0; i < 7; i++){
        metrics.drinks[i] = Array(24).fill(0);
    }
    return metrics
}

/**
 * @function recalculateMetrics - Completely recalculates all the data for all the drinks.
 * Should only be called during testing and first time loads on a new device. If old data
 * is stored, should call liveReload function instead
 * @param {*} drinkObjects 
 */
function recalculateMetrics(drinkObjects){
    let drinksList = [];
    let metrics = getDefaultMetrics();
    drinkObjects.forEach(drink => {
        updateMetrics(drink, metrics);
        drinksList.push(drink.id);
        localStorage.setItem(drink.id, JSON.stringify(drink));
    });
    localStorage.setItem('drinksList', JSON.stringify(drinksList));
    return metrics;
}

/**
 * @function updateMetrics - Updates the current metric object given a new drink
 * Should be called when 
 * @param {*} drinkObject - single drink object to be included in calculations
 * @param {*} metrics - metrics object to be updated
 */
function updateMetrics(drinkObject, metrics){
    metrics.numDrinks += 1;
    metrics.totalCost += drinkObject.price;
    metrics.drinkAvg = metrics.totalCost / metrics.numDrinks;
    let date = new Date(drinkObject.date);
    metrics.drinks[date.getDay()][date.getHours() - 1] += 1;
}

/**
 * @function liveReload = Checks which drinks have been added that are new and only updates 
 * those objects
 * @param {*} drinkObjects 
 */
function liveReload(drinkObjects, metrics){
    let drinksList = [];
    drinkObjects.forEach(drink => {
        if(!localStorage.hasOwnProperty(drink.id)){
            updateMetrics(drink, metrics);
            drinksList.push(drink.id);
            localStorage.setItem(drink.id, JSON.stringify(drink));
        }
    });
    localStorage.setItem('drinksList', JSON.stringify(drinksList));
    return metrics;
}

export default {
    'getDefaultMetrics': getDefaultMetrics,
    'liveReload': liveReload,
    'recalculateMetrics': recalculateMetrics,
    'updateMetrics': updateMetrics
}