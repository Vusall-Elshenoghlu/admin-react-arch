import {memo} from 'react';
import LeftMenuItemComponent from '../left-menu-item/left-menu-item.component';
import {generateGuid} from 'core/helpers/generate-guid';
import {HomeIcon} from 'assets/images/icons/left-menu';
import {Routes} from 'router/routes';
import {useLeftMenuStyles} from './left-menu.style';
import classNames from 'classnames';
import useLocalization from 'assets/lang';

const LeftMenuComponent = memo(({isOpen}: { isOpen: boolean }) => {
    const classes = useLeftMenuStyles();

    const translate = useLocalization();

    const items = [
        {
            id: 1,
            name: translate('home_title'),
            link: Routes.home,
            icon: <HomeIcon/>,
            submenu: [
                {
                    id: 1,
                    link: Routes.home,
                    name: translate('home_title_dashboard'),
                },
                {
                    id: 2,
                    link: Routes.statistics,
                    name: translate('home_title_statistics'),
                },
            ]
        },
        {
            id: 2,
            name: translate('table_title'),
            link: Routes.table,
            icon: <HomeIcon/>,
            submenu: [
                {
                    id: 1,
                    link: Routes.products,
                    name: translate('table_title_products'),
                },
                {
                    id: 2,
                    link: Routes.orders,
                    name: translate('table_title_orders'),
                },
            ]
        },
        {
            id: 3,
            name: translate('form_title'),
            link: Routes.form,
            icon: <HomeIcon/>,
            submenu: [
                {
                    id: 1,
                    link: Routes.form_responses,
                    name: translate('form_title_response'),
                },
            ]
        },
        {
            id: 4,
            name: translate('users_title'),
            icon: <HomeIcon/>,
            submenu: [
                {
                    id: 1,
                    link: Routes.users,
                    name: translate('users_title_list'),
                },
                {
                    id: 1,
                    link: Routes.add_user,
                    name: translate('users_title_add_user'),
                },

            ]
        },

    ];

    const leftMenuClasses = classNames({
        [classes.leftMenu]: true,
        [classes.hide]: !isOpen,
    });

    return (
        <div className={leftMenuClasses}>
            <ul>
                {
                    items.map((i: any) => (
                        <LeftMenuItemComponent
                            key={generateGuid()}
                            name={i.name}
                            link={i.link}
                            icon={i.icon}
                            submenu={i.submenu}
                        />
                    ))
                }
            </ul>
        </div>
    );
});


export default LeftMenuComponent;
