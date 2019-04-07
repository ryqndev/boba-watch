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
function recalculateMetrics(drinkObjects){
    let metrics = getDefaultMetrics();
    drinkObjects.forEach(drink => {
        updateMetrics(drink, metrics);
        localStorage.setItem(drink.id, JSON.stringify(drink));
    });
    return metrics;
}
// if(!localStorage.hasOwnProperty(drink.id)){}
function updateMetrics(drinkObject, metrics){
    metrics.numDrinks += 1;
    metrics.totalCost += drinkObject.price;
    metrics.drinkAvg = metrics.totalCost / metrics.numDrinks;
    let date = new Date(drinkObject.date);
    metrics.drinks[date.getDay()][date.getHours()] += 1;
}

export default {
    'recalculateMetrics': recalculateMetrics,
    'updateMetrics': updateMetrics,
    'getDefaultMetrics': getDefaultMetrics
}