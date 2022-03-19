import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {login as apiLogin} from "../../apis";
import {HTTP_STATUS} from "../../constants/http_status";
import {Loading} from "../../constants/loading";

// immutable
const initialState = {
    userName: 'au dep trai',
    accessToken: null,
    refreshToken: null,
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
// selector
export const selectUserName = state => state.token.userName;
export const selectError = state => state.token.error;
export const selectLoading = state => state.token.loading;
export const selectAccessToken = state => state.token.accessToken;
export const selectRefreshToken = state => state.token.refreshToken;

const tokenReducer = tokenSlice.reducer;

export default tokenReducer;
