import { Link } from 'react-router-dom';
import ImagePane from '@ryqndev/image-pane';
import example0 from '../assets/example0.png';
import example1 from '../assets/example1.png';
import example2 from '../assets/example2.png';
import example3 from '../assets/example3.png';
import splash from '../assets/bobawatch.png';
import cn from './DesktopLanding.module.scss';

const DesktopLanding = () => {
	return (
		<div className={cn.container}>
			<aside>
				<div className={cn.line}></div>BOBA WATCH<span>{'//'}</span>
				<Link to='/login'>SIGN IN</Link>
			</aside>
			<main>
				<img
					className={cn.hero}
					src={splash}
					alt='Boba Watch design splash. Collection of different app screens'
				/>
				<div className={cn.border}></div>
				<div className={cn.title}>
					<h3>
						<span>THE</span>
						<br />
						<span>MOST EXTRA,</span>
						<br />
						<span>MOST POWERFUL,</span>
						<br />
						<span>BOBA TRACKER. EVER.</span>
					</h3>
					<h1>
						<span>BOBA</span>
						<br />
						<span>
							<span>WA</span>TCH
						</span>
					</h1>
				</div>

				<div className={cn.about}>
					<h4>WHAT IS IT?</h4>
					Boba Watch is a finance web app that helps you keep track of
					how much you've spent on boba drinks. Simple as that.
				</div>

				<ImagePane
					src={example0}
					className={cn.desktop}
					alt='Screenshot of Dashboard page showing various statistics'
					content={{
						title: 'See your stats',
						description:
							'Understand all of your boba habits and spending in one convenient page. With interactive charts and maps, you can view compiled trends and statistiscs of your boba spending.',
						tag: '/dashboard',
					}}
				/>

				<div className={cn.about}>
					<h4>WHY WOULD I USE THIS?</h4>
					Because it's funny. and extra.
				</div>

				<ImagePane
					src={example1}
					className={cn.desktop}
					alt='History page screenshot showing all recorded drink entries'
					content={{
						title: 'your boba bible',
						description:
							"One drink can change your life. Never forget any drink you've had. Keep track of all your boba drinks in detail.",
						tag: '/history',
					}}
				/>

				<div className={cn.about}>
					<h4>HOW MUCH DOES IT COST?</h4>
					Nothing. It's completely free to use.
				</div>

				<ImagePane
					src={example2}
					className={cn.desktop}
					alt='Process of recording drinks screenshot showcasing business search'
					content={{
						title: 'remember places',
						description:
							'Easily add drinks and tag locations so you can view them on your map. Our simple recording process lets you focus on enjoying your drink, not worrying about the details.',
						tag: '/add',
					}}
				/>

				<div className={cn.about}>
					<h4>DO YOU SELL MY DATA?</h4>
					No. We believe your data is your own. We do not profit off
					of or sell your data.
				</div>

				<ImagePane
					src={example3}
					className={cn.desktop}
					alt='Adding drinks page with all fields filled out'
					content={{
						title: 'track what you want',
						description:
							'You\'re in charge of your own data. Track what you want to track, however you\'d like. You can add drinks, locations, and even your own custom tags.',
						tag: '/add',
					}}
				/>

				<div className={cn.about}>
					<h4>WHERE CAN I GET STARTED?</h4>
					Go ahead and login / sign up <Link to='/login'>here</Link>.
					<br />
					{/* Not convinced? Check out our <Link to='/demo'>demo</Link>. */}
				</div>
			</main>
			<footer>
				boba watch
				<span>copyright 2021</span>
			</footer>
		</div>
	);
};

export default DesktopLanding;
