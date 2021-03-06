import {createAsyncThunk} from "@reduxjs/toolkit";

const baseURl = process.env.REACT_APP_BASE_REST_API_URL

export const loginThunk = createAsyncThunk(
    'auth/Login',
    async (data) => {
        try {
            const response = await fetch(`${baseURl}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseData = await response.json()
            if (responseData.token) {
                localStorage.setItem('token', responseData.token)
                return {
                    id: responseData.user.id,
                    email: responseData.user.email,
                    firstName: responseData.user.firstName,
                    lastName: responseData.user.lastName,
                    token: responseData.token
                }
            } else {
                return {
                    error: "Server is unavailable"
                }
            }
        } catch (e) {
            return {
                error: "Something went wrong"
            }
        }

    }
)

export const registerThunk = createAsyncThunk(
    'auth/Register',
    async (data) => {
        try {
            const response = await fetch(`${baseURl}/auth/registration`, {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseData = await response.json()
            if (!responseData.error) {
                localStorage.setItem('token', responseData.token)
                return {
                    id: responseData.user.id,
                    email: responseData.user.email,
                    firstName: responseData.user.firstName,
                    lastName: responseData.user.lastName,
                    token: responseData.token
                }
            } else {
                return {
                    error: "Something went wrong, try again later"
                }
            }

        } catch (e) {
            return {
                error: "Server is unavailable"
            }
        }
    }
)
export const authThunk = createAsyncThunk(
    'auth/Auth',
    async (data) => {
        try {
            const authString = `Bearer ${localStorage.getItem('token')}`
            const response = await fetch(`${baseURl}/auth/auth`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authString,
                    "Access-Control-Allow-Origin": "http://localhost:3000"
                }
            })
            const responseData = await response.json()
            if (responseData.message !== 'jwt expired' && responseData.message !== 'jwt malformed') {
                localStorage.setItem('token', responseData.token)
                return {
                    id: responseData.user.id,
                    email: responseData.user.email,
                    firstName: responseData.user.firstName,
                    lastName: responseData.user.lastName,
                    token: responseData.token
                }
            } else {
                localStorage.removeItem('token')
                return {
                    error: responseData.message
                }
            }

        } catch (e) {
            return {
                error: "Server is unavailable"
            }
        }
    }
)


