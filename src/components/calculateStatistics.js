/** 
  [
  {
    "id": 1223,
    "name": "Wintermelon Tea",
    "location": "TPumps",
    "price": 415,
    "date": "2019-03-25T20:19:57.000Z",
    "photo": "https://photo.sconmsd/sdfsfheuygwfuiyegufywegfykeughdjveuyfwgvkfuywegfqywgfiqpuyefgoy842yfubwelhjfe",
    "description": "This is a pretty long description that should actually take over most aspects of  the dirnk",
    "createdAt": "2019-03-31T00:32:23.000Z",
    "updatedAt": "2019-03-31T01:54:47.000Z",
    "userId": 1
  },
  {
    ...
  }
]
   */
function getDefaultMetrics(){
    return {
        'numDrinks': 0,
        'totalCost': 0,
        'drinkAvg': 0,
        'drinks': Array(7)
    }
}
function recalculateMetrics(drinkObjects){
    let metrics = getDefaultMetrics();
    for(let i = 0; i < 7; i++){
        metrics.drinks[i] = Array(24).fill(0);
    }
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