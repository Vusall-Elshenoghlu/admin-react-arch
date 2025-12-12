import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {environment} from './app.config';
import {store} from 'store/store.config';
import {setLoader} from 'store/store.reducer';
import {errorToast, successToast} from '../shared/toast/toast';
import {getAccessToken, getRefreshToken, setTokens} from '../helpers/get-token';
import {API} from "./api.config";

const axiosInstance = axios.create({
    baseURL: environment.apiMain,

});
axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        let token: string | null = getAccessToken();


        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        store.dispatch(setLoader(true));
        return config;
    },
    (error) => {
        store.dispatch(setLoader(true));
        return Promise.reject(error);
    }
);



let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null) => {
    failedQueue.forEach((promise) => {
        if(error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });

    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (respone) => {
        store.dispatch(setLoader(false));
        return respone;
    },
    async (error) => {
        store.dispatch(setLoader(true));
        const originalRequest = error.config;

        if(error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try{
                const refreshToken = getRefreshToken();
                const res = await axios.post(`${environment.apiMain}/${API.refresh}`, {
                    accessToken: getAccessToken(),
                    refreshToken: getRefreshToken(),
                });

                const { token: accessToken, refreshToken: newRefreshToken } = res.data.data;
                setTokens(accessToken, newRefreshToken);

                axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
                processQueue(null, accessToken);

                return axiosInstance(originalRequest);
            }catch (err) {
                processQueue(err, null);
                errorToast("Sessiya bitdi. Yenidən daxil olun.");
                localStorage.clear();
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        const method = response?.config?.method?.toUpperCase() ?? '';

        if (method === 'POST') {
            successToast('Müraciət göndərildi');
        }

        if (response.data) {
            store.dispatch(setLoader(false));
        }
        return response;
    },
    (error) => {
        let errMessage = '';

        const {
            response: {status,},
        } = error;

        switch (status) {
            case 401:
                errMessage = 'Sessiya müddəti bitmişdir';
                localStorage.removeItem(`${environment.applicationName}-token`);
                break;

            case 404:
                errMessage = 'Məlumat tapılmadı';
                break;

            case 500:
                errMessage = 'Server xətası';
                break;

            default:
                errMessage = 'Xəta baş verdi';
        }

        errorToast(errMessage);
        store.dispatch(setLoader(false));
    }
);
export default axiosInstance;
