import {Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Routes} from '../routes';
import {IAuthProtectedRouteProps} from './auth-protected';
import {useEffect} from 'react';
import {setUser} from '../../store/store.reducer';
import {getAccessToken, getRefreshToken} from "../../core/helpers/get-token";
const AuthProtectedComponent = ({children, layout = 'public'}: IAuthProtectedRouteProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token  = getAccessToken();
        if (token){
            dispatch(setUser(token));
        }
    }, []);
        switch (layout) {
            case 'auth':
                return getAccessToken() ? <Navigate to={Routes.home} replace /> : children;
            case 'public': {
                const access = getAccessToken();
                const refresh = getRefreshToken();

                // if (!access && refresh) return children;

                return access ? children : <Navigate to={Routes.login} replace />;
            }

            default:
                return children;
        }
};

export default AuthProtectedComponent;
