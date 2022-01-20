import {createAsyncThunk} from "@reduxjs/toolkit";

const apiKey = process.env.REACT_APP_FIREBASE_WEB_API_KEY

export const loginThunk = createAsyncThunk(
    'auth/Login',
    async (data) => {
        debugger
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const responseData = await response.json()
        console.log(responseData)
        return {
            id: responseData.localId,
            email: responseData.email,
            token: responseData.idToken
        }

    }
)

export const registerThunk = createAsyncThunk(
    'auth/Register',
    async (data) => {
        debugger
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseData = await response.json()
            console.log(responseData)
            if (!responseData.error) {
                return {
                    id: responseData.localId,
                    email: responseData.email,
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
