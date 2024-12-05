import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import cookie from 'react-cookies';


export const errorHelper = (formik, values) => ({
    error: formik.errors[values] && formik.touched[values] ? true : false,
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
})


export const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
        </div>
    );
};


export const showToast = (type, message) => {
    switch (type) {
        case 'SUCCESS':
            toast.success(message);
            break;
        case 'ERROR':
            toast.error(message);
            break;
        default:
            return null;
    }
};


export const setTokenCookie = (token) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    const expiresString = expires.toUTCString();
    document.cookie = `x-access-token=${token}; expires=${expiresString}; path=/; samesite=lax`;
};


export const getTokenCookie = () => cookie.load('x-access-token');

export const removeCookie = (name) => {
    const expires = new Date();
    expires.setTime(expires.getTime() - 86400000);
    const expiresString = expires.toUTCString();
    document.cookie = `${name}=; expires=${expiresString}; path=/; samesite=lax`;
};




export const removeTokenCookie = () => {
    removeCookie('x-access-token');
};


export const getAuthHeader = () => {
    const token = getTokenCookie();
    if (token) {
        return token;
    }
    return null;
}


export const DashboardTitles = (props) => {
    return (
        <div>
            <h4><strong>{props.title}</strong></h4>
        </div>
    )
}
