import React from 'react';

import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../../store/slices/authSlice";

import logo from "../../../assets/images/connector-site_trigger-cron.png"

import c from './Header.module.css'
const Header = () => {
    const isAuth = useSelector(state => state.auth.isAuth)

    const dispatch = useDispatch()

    const onLoginHandler = () => {
        dispatch(authActions.login())
    }

    const onLogoutHandler = () => {
        dispatch(authActions.logout())
    }

    const authNav = isAuth ?
        <>
            <NavLink className={c.headerNavLink} to="/my-account">My Account</NavLink>
            <button onClick={onLogoutHandler}>Logout</button>
        </> :
        <button onClick={onLoginHandler}>Login/Register</button>


    return (
        <div className={c.header}>
            <div className={c.headerInner}>
                <div className={c.headerLogo}>
                    <Link to="/">
                        <img src={logo} alt="main logo"/>
                    </Link>
                </div>
                <nav className={c.headerNav}>
                    <NavLink className={c.headerNavLink} to="/">Home</NavLink>
                    <NavLink className={c.headerNavLink} to="/all-todos">View all todos</NavLink>
                    <NavLink className={c.headerNavLink} to="/add-new">Add new todo</NavLink>
                    {authNav}
                </nav>
            </div>
        </div>
    );
};

export default Header;
