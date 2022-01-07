import React from 'react';
import {useSelector} from "react-redux";


const TodosList = (props) => {
    const todos = useSelector(state => state.todos.todos)
    console.log(todos)

    return (
        <ul>
            {todos.map(t => <li text={t.text}>{t.text}</li>)}
        </ul>
    );
};

export default TodosList;
