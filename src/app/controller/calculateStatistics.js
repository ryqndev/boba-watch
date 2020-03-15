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
 * @param {*} drinkids 
 * TODO can make this better since chronological order is a given, just duplicate the mmetrics at certain point
 */
function recalculateMetrics(drinkids) {
    let mmetrics = getDefaultMetrics(),
        cmetrics = getDefaultMetrics(),
        today = new Date(),
        todayMonth = today.getMonth(),
        todayYear = today.getFullYear();
    drinkids.forEach(drinkid => {
        let drink = JSON.parse(localStorage.getItem(drinkid));
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
function deleteDrink(id, drinkids){
    let mmetrics = JSON.parse(localStorage.getItem('metrics'));
    let cmetrics = JSON.parse(localStorage.getItem('completeMetrics'));
    let deletedDrink = JSON.parse(localStorage.getItem(id)),
        today = new Date(),
        todayMonth = today.getMonth(),
        todayYear = today.getFullYear();
    let drinkDate = new Date(deletedDrink.date);
    if(
        drinkDate.getMonth() === todayMonth &&
        drinkDate.getFullYear() === todayYear
    ){
        updateMetrics(deletedDrink, mmetrics, false);
    }
    updateMetrics(deletedDrink, cmetrics, false);
    var i = drinkids.indexOf(id);
    if (i > -1) drinkids.splice(i, 1);
    localStorage.removeItem(id);
    localStorage.setItem('metrics', JSON.stringify(mmetrics));
    localStorage.setItem('completeMetrics', JSON.stringify(cmetrics));
}
/**
 * @function insertDrinkSorted - a modified binary search to insert 
 * the newly created drink at correctly sorted time recursively. 
 * Couldn't find a way to retrieve the local data
 */
function insertDrinkSorted( id, toInsertDate, drinks, lo, hi ){
    if( hi <= lo ) {
        return drinks.splice( toInsertDate < new Date(JSON.parse(localStorage.getItem(drinks[lo])).date) ? lo + 1 : lo, 0, id );
    }
    let mid = parseInt( (hi - lo) / 2 + lo );
    let midDate = new Date(JSON.parse(localStorage.getItem(drinks[mid])).date);
    if(toInsertDate.getTime() === midDate.getTime()){
        return drinks.splice(mid + 1, 0, id);
    }
    if(toInsertDate < midDate){
        return insertDrinkSorted( id, toInsertDate, drinks, mid + 1, hi ); 
    }
    return insertDrinkSorted( id, toInsertDate, drinks, lo, mid - 1 ); 
}
function resetMonthly(drinkids){
    let mmetrics = getDefaultMetrics(),
        today = new Date(),
        todayMonth = today.getMonth(),
        todayYear = today.getFullYear();
        
    drinkids.forEach(drinkid => {
        let drink = JSON.parse(localStorage.getItem(drinkid));
        let drinkDate = new Date(drink.date);
        if(
            drinkDate.getMonth() !== todayMonth ||
            drinkDate.getFullYear() !== todayYear
        ){
            localStorage.setItem('metrics', JSON.stringify(mmetrics));
            return mmetrics;
        }
        updateMetrics(drink, mmetrics);
    });
    localStorage.setItem('metrics', JSON.stringify(mmetrics));
    return mmetrics;
}
function addDrink(data, drinkids){
    let mmetrics = JSON.parse(localStorage.getItem('metrics'));
    let cmetrics = JSON.parse(localStorage.getItem('completeMetrics'));
    if(drinkids.length){
        insertDrinkSorted(data.id, new Date(data.date), drinkids, 0, drinkids.length - 1 );
    }else{
        drinkids.push(data.id);
    }
    updateMetrics(data, mmetrics);
    updateMetrics(data, cmetrics);
    localStorage.setItem(data.id, JSON.stringify(data));
    localStorage.setItem('metrics', JSON.stringify(mmetrics));
    localStorage.setItem('completeMetrics', JSON.stringify(cmetrics));
}
/**
 * @function updateMetrics - Updates the current metric object given a new drink
 * Should be called when 
 * @param {*} drinkObject - single drink object to be included in calculations
 * @param {*} metrics - metrics object to be updated
 */
function updateMetrics(drinkObject, metrics, add=true) {
    let value = add ? 1 : -1;
    metrics.td += value;
    metrics.tc += parseFloat(drinkObject.price) * value;
    metrics.ad = parseFloat(metrics.tc) / parseFloat(metrics.td);
    let date = new Date(drinkObject.date);
    metrics.d[date.getDay()][date.getHours() - 1] += value;
}

export default {
    'getDefaultMetrics': getDefaultMetrics,
    'recalculateMetrics': recalculateMetrics,
    'updateMetrics': updateMetrics,
    'addDrink': addDrink,
    'deleteDrink': deleteDrink,
    'resetMonthly': resetMonthly
}