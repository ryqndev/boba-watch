import React, {useState, useEffect} from 'react';
import './Searchbar.scss';
import Fuse from 'fuse.js';

const Searchbar = ({placeholder="How can I help you today?", data=[], keys=[], Result}) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleInput = (e) => {
        setQuery(e.target.value);
    }
    const fuse = new Fuse(data, {
        includeMatches: true,
        distance: 100,
        maxPatternLength: 30,
        minMatchCharLength: 1,
        keys: keys
    }); 
    useEffect(() => {
        let res = fuse.search(query);
        setResults(res);
    }, [query, data, data.length]);
    
    return (
        <div className="search-wrapper">
            <input type="text" value={query} placeholder={placeholder} onChange={handleInput}/>
            <div className="results">
                {results.map(result => <Result key={result.item.id} {...result} />)}
            </div>
        </div>
    )
}

export default Searchbar;