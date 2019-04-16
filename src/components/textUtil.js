/**
 * @function toMoney - parses int value and displays decimal format
 * @param {*} money 
 */
function toMoney(money, short = false){
    if(short){
        return parseInt(money/100);
    }
    return parseInt(money/100) + '.' + (money % 100 < 10 ? "0" + money % 100 : money % 100);
}
export default {
    toMoney: toMoney
}