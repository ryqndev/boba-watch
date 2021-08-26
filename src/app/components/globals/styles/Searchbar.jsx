import { memo, useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import cn from './Searchbar.module.scss';

const DEFAULT_KEYS = [
	'description',
	'location',
	'name',
	'price',
	'address.address',
	'address.city',
	'address.crossStreet',
];

const options = {
	includeMatches: true,
	distance: 100,
	maxPatternLength: 30,
	minMatchCharLength: 1,
	keys: DEFAULT_KEYS,
};

const Searchbar = ({
	placeholder = 'Search your history...',
	data = [],
	keys = DEFAULT_KEYS,
	Result,
}) => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [fuse, setFuse] = useState(() => new Fuse([], options));

	const handleInput = e => {
		setQuery(e.target.value);
	};

	useEffect(() => {
		setFuse(new Fuse(data, { ...options, keys: keys }));
	}, [data, keys]);

	useEffect(() => {
		let res = fuse.search(query);
		setResults(res.slice(0, 25));
	}, [fuse, query]);

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
				{query.length !== 0 && results.length === 0 && (
					<div className={cn.empty}>No results found.</div>
				)}
			</div>
		</div>
	);
};

export default memo(Searchbar);
