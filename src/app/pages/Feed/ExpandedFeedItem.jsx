import { memo, useContext, useState } from 'react';
import ExpandedDrinkDescription from '../History/ExpandedDrinkDescription';
import { database } from '../../libs/firestore';
import { useNavigate } from 'react-router-dom';
import Reviews from '../Blog/Reviews';
import Swal from 'sweetalert2';
import { alertDefaultError } from '../../libs/swal';
import AuthUserContext from '../../controller/contexts/AuthUserContext';
import './ExpandedFeedItem.scss';

const ExpandedFeedItem = ({
	show,
	person,
	name,
	place,
	description,
	date,
	uid,
	image,
	id,
}) => {
	const [reportable, setReportable] = useState(true);
	const [authUser] = useContext(AuthUserContext);
	const navigate = useNavigate();

	const report = async () => {
		if (!reportable) return;
		setReportable(false);
		const { value: reasonForReport } = await Swal.fire({
			input: 'textarea',
			inputPlaceholder: 'Reason for report...',
			inputAttributes: {
				'aria-label': 'Reason for report...',
				maxlength: 300,
			},
			showCancelButton: true,
		});
		if (reasonForReport) {
			database
				.collection('reports')
				.doc(id)
				.set(
					{
						[authUser.uid]: reasonForReport,
						post: {
							desc: description,
							name: name,
							person: person,
							date: date,
							uid: uid,
						},
					},
					{ merge: true }
				)
				.then(() => {
					Swal.fire(
						'Report received!',
						'Sorry you had to see that.... Thanks for reporting this to us so we can take a closer look at and take appropriate action',
						'success'
					);
					setReportable(true);
				})
				.catch(alertDefaultError);
		}
		setReportable(true);
	};
	const share = () => {
		navigator.share({
			title: person.name + "'s profile",
			url: 'https://share.boba.watch/#/' + uid,
		});
	};

	return (
		show && (
			<div className='expanded-feed-item--wrapper'>
				<div className='user'>
					<img
						className='avatar'
						src={person.profile}
						alt=' '
						onClick={() => {
							navigate('/blog/' + uid);
						}}
					/>
					<h2>{person.name}</h2>
				</div>

				<div className='content'>
					<ExpandedDrinkDescription
						name={name}
						location={place}
						description={description}
						image={image}
						expanded
						date={new Date(date).toDateString()}
					/>
					<div className='more-options-display'>
						<button className='share' onClick={share}>
							SHARE
						</button>
						<button className='report' onClick={report}>
							REPORT
						</button>
					</div>
					<h2 className='review'>
						<span>★</span> OTHER REVIEWS <span>★</span>
					</h2>

					<Reviews ownerUID={uid} initialDisplayCount={1} />
				</div>
			</div>
		)
	);
};

export default memo(ExpandedFeedItem);
