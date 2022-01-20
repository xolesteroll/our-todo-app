import React from "react";

import Layout from "./components/UI/Layout/Layout";
import Tabs from "./components/Tabs/Tabs";
import {Route, Routes} from "react-router-dom";
import NewTodo from "./pages/NewTodo/NewTodo";
import Homepage from "./pages/Homepage/Homepage";
import NotFound from "./pages/NotFound/NotFound";

function App() {

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/add-new" element={<NewTodo />} />
                <Route path="/all-todos" element={<Tabs/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </Layout>
    );
}

export default App;
