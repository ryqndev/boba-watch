/**
 * @function localStorageSpace - gets current used space in localstorage
 */
let localStorageSpace = function(){
    let all = 0;
    for(let key in window.localStorage){
        if( window.localStorage.hasOwnProperty(key) ){
            all += window.localStorage[key].length;
        }
    }
    if(all < 1024)      return all + ' Byte(s)';
    if(all < 1048576)   return (all / 1024) + ' Kilobyte(s)';
                        return ( all / 1048576 ) + 'Megabyte(s)';
};
localStorageSpace();


/**
 * @function parseInput
 */

let inputs = [
    '15.60',
    'a15.60',
    '15a.60',
    '15.a60',
    '15.60a',
    '1560a',
    'a1560a',
    'a15a60a'
]
let parseInput = ( input ) => {
    let value = parseFloat(input) * 100;
    return value;
}
let testParseInput = () => {
    inputs.forEach(e => {
        console.log(e , parseInput(e));
    });
}
testParseInput();