import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginThunk, registerThunk} from "../../store/thunks/authThunks";

const Login = () => {
        const [emailValue, setEmailValue] = useState('')
        const [passwordValue, setPasswordValue] = useState('')
        const [isLogin, setIsLogin] = useState(false)

        const dispatch = useDispatch()
        const navigate = useNavigate()

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
            const data = {
                email: emailValue,
                password: passwordValue
            }
            if (isLogin) {
                console.log('login')
                dispatch(loginThunk(data))
            } else {
                console.log('register')
                dispatch(registerThunk(data))
            }
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
