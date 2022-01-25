import React from 'react';

import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../store/slices/authSlice";

import logo from "../../../assets/images/connector-site_trigger-cron.png"

import c from './Header.module.css'

const Header = () => {
    const isAuth = useSelector(state => state.auth.isAuth)

    const dispatch = useDispatch()

    const onLogoutHandler = () => {
        dispatch(authActions.logout())
    }

    const activeClassFunc = ({isActive}) => `${c.headerNavLink} ${isActive ? c.active : ""}`

    const authNav = isAuth ?
        <>
            <NavLink className={activeClassFunc} to="/my-account">My Account</NavLink>
            <button onClick={onLogoutHandler}>Logout</button>
        </> :
        <NavLink className={activeClassFunc} to="/login">Login</NavLink>

    return (
        <div className={c.header}>
            <div className={c.headerInner}>
                <div className={c.headerLogo}>
                    <Link to="/">
                        <img src={logo} alt="main logo"/>
                    </Link>
                </div>
                <nav className={c.headerNav}>
                    {
                        isAuth && <>
                        <NavLink className={activeClassFunc} to="/">Home</NavLink>
                        <NavLink className={activeClassFunc} to="/my-todos">View my todos</NavLink>
                        <NavLink className={activeClassFunc} to="/add-new">Add new todo</NavLink></>
                    }
                    {authNav}
                </nav>
            </div>
        </div>
    );
};

export default Header;
