import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {authActions} from "../../store/slices/authSlice";
import {loginThunk, registerThunk} from "../../store/thunks/authThunks";
import Modal from "../UI/Modal/Modal";
import LoginForm from "./LoginForm/LoginForm";

const Login = () => {
        const [isLogin, setIsLogin] = useState(true)

        const error = useSelector(state => state.auth.error)

        const dispatch = useDispatch()
        const navigate = useNavigate()


        const onChangeIsLogin = () => {
            setIsLogin(prevState => !prevState)
        }

        const onLoginSubmitHandler = async (data) => {
            isLogin ? await dispatch(loginThunk(data)) : await dispatch(registerThunk(data))
            error ? console.log(error) : navigate('/')
        }

        const onCloseModal = () => {
            dispatch(authActions.clearError())
        }


        return (
            <>
                {error && <Modal onClose={onCloseModal} message={error}/>}
                <LoginForm
                    onFormSubmit={onLoginSubmitHandler}
                    isLogin={isLogin}
                    onChangeIsLogin={onChangeIsLogin}
                />
            </>
        );
    }
;

export default Login;
