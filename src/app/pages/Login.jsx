import { useEffect } from 'react';
import { ui } from '../libs/firestore';
import useLogin from '../controller/hooks/useLogin';
import 'firebaseui/dist/firebaseui.css';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';

const loginHeaderStyle = {
	fontFamily: 'Poppins',
	fontWeight: 700,
	color: 'white',
	fontSize: 44,
	marginBottom: 20,
};

const Login = () => {
	useLogin();

	useEffect(() => {
		ui.start('#auth-container', {
			signInSuccessUrl: window.location.href,
			signInFlow: 'popup',
			signInOptions: [
				GoogleAuthProvider.PROVIDER_ID,
				FacebookAuthProvider.PROVIDER_ID,
			],
			// tosUrl: '<your-tos-url>',
		});
	});
	
	return (
		<div className='login-page'>
			<div className='login-logo'></div>
			<h1 style={loginHeaderStyle}>boba watch</h1>
			<div id='auth-container'></div>
		</div>
	);
};

export default Login;
