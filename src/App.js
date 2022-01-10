import React from "react";

import Layout from "./components/UI/Layout/Layout";
import Tabs from "./components/Tabs/Tabs";
import {Route, Routes} from "react-router-dom";
import NewTodo from "./pages/NewTodo/NewTodo";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/add-new" element={<NewTodo />} />
                <Route path="/all-todos" element={<Tabs/>} />
            </Routes>
        </Layout>
    );
}

export default App;
