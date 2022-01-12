import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    email: null,
    token: null,
    id: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, {payload}) {
            state.email = payload.email
            state.token = payload.token
            state.id = payload.id
            state.isAuth = true
        },
        logout(state) {
            state.email = null
            state.token = null
            state.id = null
            state.isAuth = false
        }
    }
})

export const authActions = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
