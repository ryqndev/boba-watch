function toMoney(money){
    return parseInt(money/100) + '.' + (money % 100 < 10 ? "0" + money % 100 : money % 100);
}
export default {
    toMoney: toMoney
}