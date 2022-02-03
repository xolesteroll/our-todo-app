import {createAsyncThunk} from "@reduxjs/toolkit";

const baseURl = process.env.REACT_APP_BASE_REST_API_URL

export const loginThunk = createAsyncThunk(
    'auth/Login',
    async (data) => {
        console.log(baseURl)

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
        console.log(responseData)
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
            return responseData
        }
    }
)

export const registerThunk = createAsyncThunk(
    'auth/Register',
    async (data) => {
        try {
            console.log(data)
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
                return responseData
            }

        } catch (e) {
            console.log(e.message)
        }
    }
)
export const authThunk = createAsyncThunk(
    'auth/Auth',
    async (data) => {
        try {
            console.log(data)
            const authString = `Bearer ${localStorage.getItem('token')}`
            const response = await fetch(`${baseURl}/auth/auth`, {
                headers: {
                    "Authorization": authString
                }
            })
            const responseData = await response.json()
            console.log(responseData)
            if (!responseData.message) {
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
            }

        } catch (e) {
            console.log(e.message)
        }
    }
)


