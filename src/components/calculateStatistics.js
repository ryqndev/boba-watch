/**
 * @file calculateStatistics.js
 * @copyright Ryan Yang 2019
 * @summary - A set of functions to help calculate metrics for user's drink objects
 */

/**
 * @function getDefaultMetrics - returns an emtpy metrics object. Called during
 * metric recalcuation when starting from nothing. 
 * NOTE @note - drinks member should be a 2d array of 168 objects (7x24) of day by time
 * Array(7).fill(Array(24).fill(0)) creates 7 references to the same array and therefore
 * will not work as intended
 */
function getDefaultMetrics() {
    let metrics = {
        'td': 0, //total drinks
        'tc': 0, //total cost
        'ad': 0, //average drink cost
        'd': Array(7), //time of drinks
    }
    for (let i = 0; i < 7; i++) {
        metrics.d[i] = Array(24).fill(0);
    }
    return metrics;
}

/**
 * @function recalculateMetrics - Completely recalculates all the data for all the drinks.
 * Should only be called during testing and first time loads on a new device. If old data
 * is stored, should call liveReload function instead
 * @param {*} drinkObjects 
 */
function recalculateMetrics(drinkObjects) {
    let mmetrics = getDefaultMetrics(),
        cmetrics = getDefaultMetrics(),
        today = new Date(),
        todayMonth = today.getMonth(),
        todayYear = today.getFullYear();
    drinkObjects.forEach(drink => {
        let drinkDate = new Date(drink.date);
        if(
            drinkDate.getMonth() === todayMonth &&
            drinkDate.getFullYear() === todayYear
        ){
            updateMetrics(drink, mmetrics);
        }
        updateMetrics(drink, cmetrics);
    });
    localStorage.setItem('metrics', JSON.stringify(mmetrics));
    localStorage.setItem('completeMetrics', JSON.stringify(cmetrics));
    return mmetrics;
}

/**
 * @function updateMetrics - Updates the current metric object given a new drink
 * Should be called when 
 * @param {*} drinkObject - single drink object to be included in calculations
 * @param {*} metrics - metrics object to be updated
 */
function updateMetrics(drinkObject, metrics) {
    metrics.td += 1;
    metrics.tc += drinkObject.price;
    metrics.ad = metrics.tc / metrics.td;
    let date = new Date(drinkObject.date);
    metrics.d[date.getDay()][date.getHours() - 1] += 1;
}

/**
 * @function liveReload = Checks which drinks have been added that are new and only updates 
 * those objects
 * @param {*} drinkObjects 
 */
function liveReload(drinkObjects, metrics) {
    let drinksList = [];
    drinkObjects.forEach(drink => {
        if (!localStorage.hasOwnProperty(drink.id)) {
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