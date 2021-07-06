import Card from '../../../components/globals/styles/Card';
import { useTranslation } from 'react-i18next';
import cn from './DesktopDashboard.module.scss';
import {Searchbar} from '../../../components';
import DrinkPanel from '../../History/DrinkPanel';

const DesktopDashboard = () => {
    const {t} = useTranslation();

    return (
        <div className={cn.wrapper}>
            <div className={cn.content}>
                <header>
                    <h1 className={cn.title}>{t('dashboard')}</h1>
                </header>

                <Card className={cn.map}>
                    <img className={cn.fake} src="https://upload.wikimedia.org/wikipedia/commons/1/14/Mercator_Projection.svg" alt="d" />
                </Card>
            </div>
            <aside className={cn.sidebar}>
                <div className={cn.scrollable}>
                    <div className={cn.container}>
                        <Card className={cn.search}>
                            <h2>Search</h2>
                            <Searchbar 
                                placeholder={t('Search your history...')}
                                data={JSON.parse(localStorage.getItem('drinkids')).slice(0, 5).map(id => JSON.parse(localStorage.getItem(id)))}
                                keys={['description', 'location', 'name', 'price']}
                                Result={({item}) => <DrinkPanel triggerUpdate={() => {}} data={item}/>}
                            />
                        </Card>
                        <Card className={cn.recent}>
                            <h2>Recent Activity</h2>
                            {JSON.parse(localStorage.getItem('drinkids')).slice(0, 5).map(id => {
                                let drink = JSON.parse(localStorage.getItem(id));
                                return <DrinkPanel key={id} data={drink} expandable={false}/>
                            })}
                        </Card>
                    </div>
                </div>
            </aside>
        </div>
    );
}


export default DesktopDashboard;
