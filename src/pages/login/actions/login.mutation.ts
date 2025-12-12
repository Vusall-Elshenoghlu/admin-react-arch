import {useMutation} from 'react-query';
import {login} from './login.service';
import {store} from 'store/store.config';
import {setUser} from 'store/store.reducer';
import {setTokens} from 'core/helpers/get-token';
import {useNavigate} from 'react-router-dom';
import {Routes} from 'router/routes';
import {ILoginFormValues} from '../login';

export const useLogin = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (credentials: ILoginFormValues) => {
            return login(credentials);
        },
        onSuccess: (response) => {
            console.log(response);
            const {data} = response;
            console.log(data);
            setTokens(data.token, data.refreshtoken);
            store.dispatch(setUser(data.user));
            navigate(Routes.home);
        },
    });
};
