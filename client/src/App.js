import React from "react";

import Layout from "./components/UI/Layout/Layout";
import {Navigate, Route, Routes} from "react-router-dom";
import NewTodo from "./pages/NewTodo/NewTodo";
import Homepage from "./pages/Homepage/Homepage";
import NotFound from "./pages/NotFound/NotFound";
import {useSelector} from "react-redux";
import Login from "./components/Login/Login";
import MyTodos from "./pages/MyTodos/MyTodos";

function App() {
    const isAuth = useSelector(state => state.auth.isAuth)

    return (
        <Layout>
            <Routes>
                    <Route path="/" element={isAuth ? <Homepage/> : <Navigate to="/login"/>}/>
                    <Route path="/login" element={!isAuth ? <Login/> : <Homepage/>}/>
                    <Route path="/add-new" element={isAuth ? <NewTodo/> : <Navigate to="/login"/>}/>
                    <Route path="/my-todos" element={isAuth ? <MyTodos/> : <Navigate to="/login"/>}>
                        <Route path=":statusFilter" element={<MyTodos/>} />
                    </Route >
                    <Route path="*" element={isAuth ? <NotFound/> : <Navigate to="/login"/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
