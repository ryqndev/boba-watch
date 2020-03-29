/**
 * @function toMoney - parses int value and displays decimal format
 * @param {*} money 
 */
function toMoney(money, short = false){
    if(short){
        return parseInt(money/100);
    }
    return Number(money/100).toFixed(2);
}
export default {
    toMoney: toMoney
}