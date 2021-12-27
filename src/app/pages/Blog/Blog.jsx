import { memo } from 'react';
import cn from './Blog.module.scss';

const Blog = () => {
	return (
		<div className={cn.container}>
			<h2>Newest Features</h2>
			<p>
				Locator page has toggle to show either nearby locations or
				previously recorded drinks. Next planned updates increase QOL of
				locator page even more than most recent update.
			</p>
			<h3>Previous Updates</h3>
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
			<br />
			If something is broken or you have any suggestions or just wanna
			chat, send me an <a href='mailto:ryanqyang@gmail.com'>email</a>
			!
			<br />
			<br />
			<p>boba watch v. {process.env.REACT_APP_VERSION}</p>
		</div>
	);
};

export default memo(Blog);
