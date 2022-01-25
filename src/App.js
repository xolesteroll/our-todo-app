import React from "react";

import Layout from "./components/UI/Layout/Layout";
import Tabs from "./components/Tabs/Tabs";
import {Navigate, Route, Routes} from "react-router-dom";
import NewTodo from "./pages/NewTodo/NewTodo";
import Homepage from "./pages/Homepage/Homepage";
import NotFound from "./pages/NotFound/NotFound";
import {useSelector} from "react-redux";
import Login from "./components/Login/Login";

function App() {
    const isAuth = useSelector(state => state.auth.isAuth)

    return (
        <Layout>
            <Routes>
                    <Route path="/" element={isAuth ? <Homepage/> : <Navigate to="/login"/>}/>
                    <Route path="/login" element={!isAuth ? <Login/> : <Homepage/>}/>
                    <Route path="/add-new" element={isAuth ? <NewTodo/> : <Navigate to="/login"/>}/>
                    <Route path="/all-todos" element={isAuth ? <Tabs/> : <Navigate to="/login"/>}/>
                    <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
