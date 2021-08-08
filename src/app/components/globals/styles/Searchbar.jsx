import { memo, useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import cn from './Searchbar.module.scss';

const DEFAULT_KEYS = ['description', 'location', 'name', 'price'];

const Searchbar = ({
	placeholder = 'Search your history...',
	data = [],
	keys = DEFAULT_KEYS,
	Result,
}) => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);

	const handleInput = e => {
		setQuery(e.target.value);
	};
	const fuse = new Fuse(data, {
		includeMatches: true,
		distance: 100,
		maxPatternLength: 30,
		minMatchCharLength: 1,
		keys: keys,
	});
	useEffect(() => {
		let res = fuse.search(query);
		setResults(res.slice(0, 25));
	}, [query, data, data.length]);

	return (
		<div className={cn.container}>
			<input
				type='text'
				value={query}
				placeholder={placeholder}
				onChange={handleInput}
			/>
			<div className={cn.results}>
				{results.map(result => (
					<Result key={result.item.id} {...result} />
				))}
			</div>
		</div>
	);
};

export default memo(Searchbar);
