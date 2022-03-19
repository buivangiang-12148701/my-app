import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {HTTP_STATUS} from "../../constants/http_status";
import {Loading} from "../../constants/loading";
import {getAllCustomer as apiGetAllCustomer} from '../../apis';

const initialState = {
    list: [],
    loading: Loading.idle,
    error: null,
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getAllCustomer.pending, (state, action) => {
            if (state.loading === Loading.idle) {
                state.loading = Loading.pending;
            }
        })
            .addCase(getAllCustomer.fulfilled, (state, action) => {
                if (
                    state.loading === Loading.pending
                ) {
                    state.loading = Loading.idle;
                    state.list = [...state.list, ...action.payload];
                }
            })
            .addCase(getAllCustomer.rejected, (state, action) => {
                if (
                    state.loading === Loading.pending
                ) {
                    state.loading = Loading.idle;
                }
            })
    },
})

// handle thunk
export const getAllCustomer = createAsyncThunk(
    'customer/getAll',
    async (data, {rejectWithValue}) => {
        try {
            const response = await apiGetAllCustomer();
            if (response.status === HTTP_STATUS.ok) {
                return response.data.message;
            }
        } catch(err) {
            return rejectWithValue(err.response.data);
        }

    }
)


// selector
export const selectCustomers = state => state.customer.list;

const customerReducer = customerSlice.reducer;

export default customerReducer;