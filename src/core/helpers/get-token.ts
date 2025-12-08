import {environment} from '../configs/app.config';


export const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem(`${environment.applicationName}-access`, accessToken);
    localStorage.setItem(`${environment.applicationName}-refresh`, refreshToken);
};


export const getAccessToken = (): string | null => {
    return localStorage.getItem(`${environment.applicationName}-access`);
};

export const getRefreshToken = (): string | null => {
    return localStorage.getItem(`${environment.applicationName}-refresh`);
};

