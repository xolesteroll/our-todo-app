import {createSlice} from "@reduxjs/toolkit";
import {loginThunk, registerThunk} from "../thunks/authThunks";

const initialState = {
    isAuth: false,
    email: null,
    token: null,
    id: null,
    error: null,
    isFetching: false
}

const authDataSetter = (state, payload) => {
    if (!payload.error) {
        state.email = payload.email
        state.token = payload.token
        state.id = payload.id
        state.isAuth = true
    } else {
        state.error = payload.error.message
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.email = null
            state.token = null
            state.id = null
            state.isAuth = false
        },
        clearError(state) {
            state.error = null
        }
    },
    extraReducers: {
        [loginThunk.pending]: (state) => {
            state.isFetching = true
        },
        [loginThunk.fulfilled]: (state, {payload}) => {
            authDataSetter(state, payload)
            state.isFetching = false
        },
        [registerThunk.pending]: (state) => {
            state.isFetching = true
        },
        [registerThunk.fulfilled]: (state, {payload}) => {
            authDataSetter(state, payload)
            state.isFetching = false
        }
    }
})

export const authActions = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
