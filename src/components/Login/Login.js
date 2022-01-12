import React, {useState} from 'react';
import {authActions} from "../../store/slices/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Login = () => {
        const [emailValue, setEmailValue] = useState('')
        const [passwordValue, setPasswordValue] = useState('')
        const [isLogin, setIsLogin] = useState(false)

        const dispatch = useDispatch()
        const navigate = useNavigate()

        const {login} = authActions

        const onChangeEmailValueHandler = (e) => {
            const emailText = e.target.value
            setEmailValue(emailText)
        }

        const onChangePasswordValueHandler = (e) => {
            const passText = e.target.value
            setPasswordValue(passText)
        }

        const onChangeIsLogin = () => {
            setIsLogin(prevState => !prevState)
        }

        const onLoginSubmitHandler = async (e) => {
            e.preventDefault()
            let url
            const apiKey = process.env.REACT_APP_FIREBASE_WEB_API_KEY
            if (isLogin) {
                url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
            } else {
                url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
            }
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            dispatch(login({
                id: data.localId,
                email: data.email,
                token: data.idToken
            }))
            navigate('/')
        }


        return (
            <form onSubmit={onLoginSubmitHandler}>
                <h3>{isLogin ? "Login" : "Sign Up"}</h3>
                <label htmlFor="email">
                    Your Email
                </label>
                <input type="email" value={emailValue} onChange={onChangeEmailValueHandler}/>
                <label htmlFor="password">
                    Your Password
                </label>
                <input type="password" value={passwordValue} onChange={onChangePasswordValueHandler}/>
                <button type="submit">{isLogin ? "Login" : "Register"}</button>
                <button type="button"
                        onClick={onChangeIsLogin}>{isLogin ? "Create new account" : "Login with existing account"}</button>
            </form>
        );
    }
;

export default Login;
