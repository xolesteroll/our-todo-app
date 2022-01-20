import {createSlice} from "@reduxjs/toolkit";
import {loginThunk, registerThunk} from "../thunks/authThunks";

const initialState = {
    isAuth: false,
    email: null,
    token: null,
    id: null,
    error: null
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
        }
    },
    extraReducers: {
        [loginThunk.fulfilled]: (state, {payload}) => {
            console.log(payload)
            state.email = payload.email
            state.token = payload.token
            state.id = payload.id
            state.isAuth = true
        },
        [registerThunk.fulfilled]: (state, {payload}) => {
            if (!payload.error) {
                state.email = payload.email
                state.token = payload.token
                state.id = payload.id
                state.isAuth = true
            } else {
                state.error = payload.error.message
            }
        }
    }
})

export const authActions = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
