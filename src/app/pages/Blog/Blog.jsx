import { memo } from 'react';
import { useParams } from 'react-router-dom';
import cn from './Blog.module.scss';


const Blog = () => {
	const { userid } = useParams();

	return (
		<div className={cn.container}>
			<h2>Check back soon!</h2>
			<p>
				We are temporarily pausing our blog feature since we are
				planning on releasing a new Guides feature instead.
				<br />
				<br />
				In the meantime, check out the new desktop version with our new
				location tagging feature. We plan on publishing new features and
				charts as soon as they're tested and ready!
			</p>
		</div>
	);
};

export default memo(Blog);
