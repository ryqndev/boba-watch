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
 * TODO can make this better since chronological order is a given, just duplicate the mmetrics at certain point
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
function deleteDrink( id ){
    let mmetrics = JSON.parse(localStorage.getItem('metrics'));
    let cmetrics = JSON.parse(localStorage.getItem('completeMetrics'));
    let drinks = JSON.parse(localStorage.getItem('drinkids'));
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
    var i = drinks.indexOf(id);
    if (i > -1) drinks.splice(i, 1);
    localStorage.removeItem( id );
    localStorage.setItem('metrics', JSON.stringify(mmetrics));
    localStorage.setItem('completeMetrics', JSON.stringify(cmetrics));
    localStorage.setItem('drinkids', JSON.stringify(drinks));
}
/**
 * @function insertDrinkSorted - a modified binary search to insert 
 * the newly created drink at correctly sorted time recursively. 
 * Couldn't find a way to retrieve the local data
 * @param {*} id 
 * @param {*} toInsertDate 
 * @param {*} drinks 
 * @param {*} lo 
 * @param {*} hi 
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
function addDrink( drinkData, id ){
    let mmetrics = JSON.parse(localStorage.getItem('metrics'));
    let cmetrics = JSON.parse(localStorage.getItem('completeMetrics'));
    let drinks = JSON.parse(localStorage.getItem('drinkids'));
    drinkData.drink.id = id;
    if(drinks.length){
        insertDrinkSorted( id, new Date(drinkData.drink.date), drinks, 0, drinks.length - 1 );
    }else{
        drinks.push(id);
    }
    updateMetrics(drinkData.drink, mmetrics);
    updateMetrics(drinkData.drink, cmetrics);
    localStorage.setItem(id, JSON.stringify(drinkData.drink));
    localStorage.setItem('metrics', JSON.stringify(mmetrics));
    localStorage.setItem('completeMetrics', JSON.stringify(cmetrics));
    localStorage.setItem('drinkids', JSON.stringify(drinks));
}
/**
 * @function updateMetrics - Updates the current metric object given a new drink
 * Should be called when 
 * @param {*} drinkObject - single drink object to be included in calculations
 * @param {*} metrics - metrics object to be updated
 */
function updateMetrics(drinkObject, metrics, add=true) {
    metrics.td += add ? 1 : -1;
    metrics.tc += add ? parseFloat(drinkObject.price) : (parseFloat(drinkObject.price) * -1);
    metrics.ad = parseFloat(metrics.tc) / parseFloat(metrics.td);
    let date = new Date(drinkObject.date);
    metrics.d[date.getDay()][date.getHours() - 1] += add ? 1 : -1;
}

export default {
    'getDefaultMetrics': getDefaultMetrics,
    'recalculateMetrics': recalculateMetrics,
    'updateMetrics': updateMetrics,
    'addDrink': addDrink,
    'deleteDrink': deleteDrink
}