import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {authActions} from "../../store/slices/authSlice";
import {loginThunk, registerThunk} from "../../store/thunks/authThunks";
import Modal from "../UI/Modal/Modal";

const Login = () => {
        const [emailValue, setEmailValue] = useState('')
        const [passwordValue, setPasswordValue] = useState('')
        const [isLogin, setIsLogin] = useState(true)

        const error = useSelector(state => state.auth.error)

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

            isLogin ? await dispatch(loginThunk(data)) : await dispatch(registerThunk(data))
            error ? console.log(error) : navigate('/')
        }

        const onCloseModal = () => {
            dispatch(authActions.clearError())
        }


        return (
            <>
                {error && <Modal onClose={onCloseModal} message={error}/>}
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
            </>
        );
    }
;

export default Login;
