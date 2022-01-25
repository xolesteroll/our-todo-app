import React, {useState} from 'react';

import c from './LoginForm.module.css'

const LoginForm = ({
                       onFormSubmit,
                       isLogin,
                       onChangeIsLogin
}) => {
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')


    const onChangeEmailValueHandler = (e) => {
        const emailText = e.target.value
        setEmailValue(emailText)
    }

    const onChangePasswordValueHandler = (e) => {
        const passText = e.target.value
        setPasswordValue(passText)
    }

    const sendDataOnSubmitHAndler = (e) => {
        e.preventDefault()
        onFormSubmit({
            email: emailValue,
            password: passwordValue
        })
    }

    return (
        <form className={c.form} onSubmit={sendDataOnSubmitHAndler}>
            <h3 className={c.formTitle}>{isLogin ? "Login" : "Sign Up"}</h3>
            <div className={c.formFields}>
                <label htmlFor="email">
                    Your Email
                </label>
                <input type="email" value={emailValue} onChange={onChangeEmailValueHandler}/>
                <label htmlFor="password">
                    Your Password
                </label>
                <input type="password" value={passwordValue} onChange={onChangePasswordValueHandler}/>
            </div>
            <div className={c.formControls}>
                <button className={c.loginBtn} type="submit">{isLogin ? "Login" : "Register"}</button>
                <p>or</p>
                <button className={c.isLoginBtn} type="button"
                        onClick={onChangeIsLogin}>{isLogin ? "Create new account" : "Login with existing account"}</button>
            </div>
        </form>
    );
};

export default LoginForm;
