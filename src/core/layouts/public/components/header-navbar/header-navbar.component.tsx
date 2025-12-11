import HeaderRightComponent from '../header-right/header-right.component';
import adminLogo from 'assets/images/statics/simaaaaa.svg';
import {useHeaderNavbarStyles} from './header-navbar.style';
import {NavLink} from 'react-router-dom';
import {Routes} from 'router/routes';
import {useEffect, useState} from "react";

const HeaderNavbarComponent = () => {
    const classes = useHeaderNavbarStyles();
    const [dateTime, setDateTime] = useState('');

    useEffect(() => {
        const tick = () => {
            const now = new Date();

            const dateStr = now.toLocaleDateString('az-AZ', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            const hourMinute = now.toLocaleTimeString('az-AZ', {
                hour: '2-digit',
                minute: '2-digit',
            });
            const seconds = now.getSeconds().toString().padStart(2, '0');

            setDateTime(`${dateStr} - ${hourMinute}:${seconds}`);
        };

        tick();
        const interval = setInterval(tick, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${classes.navbar} py-8 pl-30 pr-20`}>
            <div className='row align-center'>
                <div className='col-4'>
                    <div className={classes.left}>
                        <NavLink to={Routes.default}>
                            <img src={adminLogo} alt='logo'/>
                        </NavLink>
                    </div>
                </div>
                <div className='col-4'>
                    <div className={classes.center}>
                        <span>{dateTime}</span>
                    </div>
                </div>
                <div className='col-4'>
                    <HeaderRightComponent/>
                </div>
            </div>
        </div>
    );
};

export default HeaderNavbarComponent;
