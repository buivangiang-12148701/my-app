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
    // const refreshTokenFake = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWI5OGIwMWY3OTllMjQyNzExMzY1MTYiLCJpYXQiOjE2NDczNDkxNTQsImV4cCI6MTY0NzQzNTU1NH0.MJTTHZYIrPXHqXt_xMPTaQDzCDYzPJMtp8zSOrHjI-fA-7pvCW_O9uo1w7P8EWa5ZSg9XmrxFCdZgeYqdb-siKJ0ckmI1bM6AMEdirL6lyCvCJzP7NxSr-W6z1Sy0_et-hV9u3Hg8U72uRYb8EJCBojdOOsgr0mXG_2VDPaKpuNBzNYM6wBQmXYMrZLkd_o1ygizddFG_iI0RJpew_mWoTJDdmyFGq3mA-LMunTjXiBHTZXasFeO2m1wKFdcDc-xhbqp9bg7nuQ-k6HrkfhN6KvOB9-9aXwv0Dn8G8EeWupzhRbSF_F7luNHmChT1XZsAIJLDu42E4q9bkb9frKZ_w"
    console.log('đã refreshToken')
    return await client.get(`${API.pathRenewToken}?refresh_token=${refreshToken}`);

}


export {
    login,
    renewToken,
}
