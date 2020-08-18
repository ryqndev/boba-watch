/**
 * @function toMoney - parses int value and displays decimal format
 * @param {*} money 
 */
function toMoney(money, short = false){
    if(short){
        let res = parseInt(money/100);
        return isNaN(res) ? '---' : res;
    }
    let res = Number(money/100).toFixed(2);
    return isNaN(res) ? '---' : res;
}
export default {
    toMoney: toMoney
}