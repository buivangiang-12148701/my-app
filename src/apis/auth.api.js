/**
 *
 * @param {String} email
 * @param {String} password
 */
import {API, client} from "./base.api";
import {useSelector} from "react-redux";
import {selectRefreshToken} from "../stores/reducers/token.reducer";

const login = async (username, password) => {
    return await client.post(API.pathLogin, {
        username,
        password,
    })
}

/**
 *
 * @param refreshToken
 * @returns {Promise<AxiosResponse<any>>}
 */
// const refreshToken2 = useSelector(selectRefreshToken);

const renewToken = async (refreshToken) => {
    return await client.get(`${API.pathRenewToken}?refresh_token=${refreshToken}`);
}


export {
    login,
    renewToken,
}
