import axios from "axios";
import {HTTP_STATUS} from "../constants/http_status";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {useDispatch, useSelector} from "react-redux";
import {login, renewToken, selectRefreshToken} from "../stores/reducers/token.reducer";

const API = Object.freeze({
    pathLogin: '/api/v1/login',
    pathCustomer: '/api/v1/customer',
    pathRenewToken: '/api/v1/refeshtoken'
});

const client = axios.create({
    baseURL: 'https://api-dev.hrms.com.vn',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const clientAuthentication = axios.create({
    baseURL: 'https://api-dev.hrms.com.vn',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
});
// const dispatch = useDispatch();
// const _bindAPILogin = async () => {
//     return await dispatch(login({username: 'giangbv@qi.com.vn', password: '123456'})).unwrap();
// }
// const refreshToken = useSelector(selectRefreshToken);
const urlPatternValidation = URL => {
    let re = new RegExp(/\/api\/v1\/refeshtoken\?(?:...)+/, 'i') // constructor with regular expression literal as first argument (Starting with ECMAScript 6)
    return re.test(URL);
};

const tryAgainAPI = (config, accessToken) => {
    console.log('tryAgainAPI');
    console.log(config, accessToken);
    const cloneConfig = {...config};
    cloneConfig.headers['Authorization'] = `Bearer ${accessToken}`;
    return axios(cloneConfig);
}
const setup = (store) => {
    const { dispatch } = store;
    clientAuthentication.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if(error.response.status === HTTP_STATUS.unAuthorized ) { // trường hợp call api hết hạn accesstoken
            // // access token expired
            // // TODO call refresh token to renew access token
            console.log('access token expired');
            await dispatch(renewToken({config: error.config, callback: tryAgainAPI})).unwrap();
            // try {
            //     const response = await renewToken(localStorage.getItem('123'));
            //     localStorage.setItem("refresh_token", response.data.message['refresh_token']);
            //     error.config.headers['Authorization'] = 'Bearer ' + response.data.message['access_token'];
            //     return clientAuthentication.request(error.config);
            // } catch (childError) {
            //     console.log(childError);
            // }
        }
        return Promise.reject(error);
    });
}
export {
    client,
    API,
    clientAuthentication,
    setup,
}
