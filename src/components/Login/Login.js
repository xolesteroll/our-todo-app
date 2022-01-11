import React, {useState} from 'react';
import {authActions} from "../../store/slices/authSlice";

const Login = () => {
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [isLogin, setIsLogin] = useState(false)

    const {login, logout} = authActions

    const apiKey = process.env.REACT_APP_FIREBASE_WEB_API_KEY
    console.log(apiKey)

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
        if (isLogin) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
        }
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue,
                returnSecureToken: true
            })
        }).then(data => console.log(data))
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
};

export default Login;
