import { memo } from 'react';
import cn from './Blog.module.scss';

const Blog = () => {
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
			<br />
			(If some colors are missing, try changing the theme and toggle back. im working on a fix asap i promise)
			<br />
			<br />
			If something is broken or you have any suggestions or just wanna chat, send me an{' '}
			<a href='mailto:ryanqyang@gmail.com'>email</a>
			!
			<br />
			<br />
			<p>boba watch v. {process.env.REACT_APP_VERSION}</p>
		</div>
	);
};

export default memo(Blog);
