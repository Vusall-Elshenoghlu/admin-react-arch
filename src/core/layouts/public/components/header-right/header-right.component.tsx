import avatar from 'assets/images/statics/juan.jpg';
import {LogoutIcon} from 'assets/images/icons/logout';
import {useHeaderRightStyles} from './header-right.style';
import {useNavigate} from "react-router-dom";
import {successToast} from "../../../../shared/toast/toast";
import {Modal} from "antd";
import {Routes} from "../../../../../router/routes";

const HeaderRightComponent = () => {
    const classes = useHeaderRightStyles();
    const navigate = useNavigate();
    const handleLogout = () => {
        Modal.confirm({
            title: 'eminsen?',
            content: "cixacaqsan",
            okText: "beli",
            cancelText: "yox",
            onOk: () => {

                console.log('User logged out');
                localStorage.clear();
                successToast("Logged Out!");
                navigate(Routes.login);

            },
        });
    };

    return (
        <ul className={classes.items}>
            <li className={classes.avatar}>
                <img src={avatar} alt='avatar'/>
            </li>
            <li className={classes.logout} onClick={handleLogout}>
                <LogoutIcon/>
            </li>
        </ul>
    );
};

export default HeaderRightComponent;
