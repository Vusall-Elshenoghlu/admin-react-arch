import {Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Routes} from '../routes';
import {IAuthProtectedRouteProps} from './auth-protected';
import {useEffect} from 'react';
import {setUser} from '../../store/store.reducer';
import {getAccessToken} from "../../core/helpers/get-token";
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
            case 'public':
                return getAccessToken() ? children : <Navigate to={Routes.login} replace />;
            default:
                return children;
        }
};

export default AuthProtectedComponent;
