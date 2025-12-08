import {API} from 'core/configs/api.config';
import axiosInstance from 'core/configs/axios.config';
import {ILoginFormValues} from '../login';

export const login = (credentials: ILoginFormValues) => {
    return axiosInstance.post(API.login, {
        EmailOrUserName: credentials.EmailOrUserName,
        password: credentials.password
    }).then(res => res.data);
};


