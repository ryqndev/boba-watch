import { useTranslation } from 'react-i18next';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const Text = ({ translate = false, children }) => {
	const { t } = useTranslation();
	return (
		<SwitchTransition>
			<CSSTransition key={children} classNames='fade-quick' timeout={100}>
				<span>{translate ? t(children) : children}</span>
			</CSSTransition>
		</SwitchTransition>
	);
};

export default Text;
