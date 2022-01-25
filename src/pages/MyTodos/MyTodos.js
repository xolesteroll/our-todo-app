import React from 'react';
import Tabs from "../../components/Tabs/Tabs";

import c from './MyTodos.module.css'
import {useSelector} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const MyTodos = () => {
    const isFetching = useSelector(state => state.todos.isFetching)

    return (
        !isFetching ? <Tabs /> : <Spinner />
    );
};

export default MyTodos;
