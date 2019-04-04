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
function checkLoad(){
    
}
function recalculateMetrics(drinkObjects){
    let metrics  = {
        'numDrinks': 0,
        'totalCost': 0,
        'drinkAvg': 0,
        'dates': [ 0, 0, 0, 0, 0, 0, 0],
        'times': [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    }
    drinkObjects.forEach(drink => {
        updateMetrics(drink);
        localStorage.setItem('metrics', metrics);
    });
}
function updateMetrics(drinkObject, metrics){
    metrics.numDrinks += 1;
    metrics.totalCost += drinkObject.price;
    metrics.drinkAvg = metrics.totalCost / metrics.numDrinks;

    let date = new Date(drinkObject.date);
    metrics.dates[date.getDay()] += 1
    metrics.times[date.getHours()] += 1;
}
