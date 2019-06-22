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