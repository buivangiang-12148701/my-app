import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {login as apiLogin, renewToken as apiRenewToken} from "../../apis";
import {HTTP_STATUS} from "../../constants/http_status";
import {Loading} from "../../constants/loading";
import axios from "axios";

// immutable
const initialState = {
    userName: 'au dep trai',
    accessToken: null,
    refreshToken: null,
    config: null,
    loading: Loading.idle,
    error: null,
}

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(login.pending, (state, action) => {
            if (state.loading === Loading.idle) {
                state.loading = Loading.pending;
            }
        })
            .addCase(login.fulfilled, (state, action) => {
                if (
                    state.loading === Loading.pending
                ) {
                    state.loading = Loading.idle;
                    const {access_token, refresh_token} = action.payload;
                    state.accessToken = access_token;
                    state.refreshToken = refresh_token;
                }
            })
            .addCase(login.rejected, (state, action) => {
                if (
                    state.loading === Loading.pending
                ) {
                    state.loading = Loading.idle;
                    const {error} = action.payload;
                    state.error = error;
                }
            })


        builder.addCase(renewToken.pending, (state, action) => {
            if (state.loading === Loading.idle) {
                state.loading = Loading.pending;
            }
        })
            .addCase(renewToken.fulfilled, (state, action) => {
                if (
                    state.loading === Loading.pending
                ) {
                    state.loading = Loading.idle;
                    const {access_token, refresh_token, config} = action.payload;
                    state.accessToken = access_token;
                    state.refreshToken = refresh_token;
                    // axios(config);
                }
            })
            .addCase(renewToken.rejected, (state, action) => {
                if (
                    state.loading === Loading.pending
                ) {
                    state.loading = Loading.idle;
                    const {error} = action.payload;
                    state.error = error;
                }
            })
    },
})

// handle thunk
export const login = createAsyncThunk(
    'token/login',
    async (data, {rejectWithValue}) => {
        const {username, password} = data; //
        if (username === undefined || password === undefined) {
            // TODO throw error
        }
        try {
            const response = await apiLogin(username, password);
            if (response.status === HTTP_STATUS.ok) {
                return response.data.message;
            }

        } catch(err) {
            return rejectWithValue(err.response.data);
        }

    }
)

export const renewToken = createAsyncThunk(
    'token/renewToken',
    async (data, {rejectWithValue, getState}) => {
        try {
            const {config, callback} = data;
            const state = getState();
            const refreshToken = selectRefreshToken(state);
            console.log(`show refresh token old: ${refreshToken}`);
            const response = await apiRenewToken(refreshToken);
            if (response.status === HTTP_STATUS.ok) {
                const message = response.data.message;
                const {access_token} = message;
                callback(config, access_token);
                return message;
            }
        } catch(err) {
            return rejectWithValue(err.response.data);
        }
    }
)
// selector
export const selectUserName = state => state.token.userName;
export const selectError = state => state.token.error;
export const selectLoading = state => state.token.loading;
export const selectAccessToken = state => state.token.accessToken;
export const selectRefreshToken = state => state.token.refreshToken;

const tokenReducer = tokenSlice.reducer;

export default tokenReducer;
