import React from 'react';
import {useSelector} from "react-redux";
import Login from "../../components/Login/Login";

const Homepage = () => {
    const isAuth = useSelector(state => state.auth.isAuth)

    return (
        <div>
            {isAuth ? <h1>Homepage</h1> : <Login />}
        </div>
    );
};

export default Homepage;
