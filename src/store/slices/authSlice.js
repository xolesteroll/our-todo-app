import {createSlice} from "@reduxjs/toolkit";
import {loginThunk, registerThunk} from "../thunks/authThunks";

const initialState = {
    isAuth: false,
    email: null,
    token: null,
    id: null,
    error: null
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
        }
    },
    extraReducers: {
        [loginThunk.fulfilled]: (state, {payload}) => {
            authDataSetter(state, payload)
        },
        [registerThunk.fulfilled]: (state, {payload}) => {
            authDataSetter(state, payload)
        }
    }
})

export const authActions = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
