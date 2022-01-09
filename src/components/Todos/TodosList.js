import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {todosActions} from "../../store/slices/todosSlice";

import TodoItem from "./TodoItem/TodoItem";

import s from './TodosList.module.css'


const TodosList = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()


    const todos = useSelector(state => state.todos.todos)
    const statusesList = useSelector(state => state.todos.statuses)


    const onTextChangeHandler = (e) => {
        const text = e.target.value

        setText(text)
    }

    const onAddTodoHandler = () => {
        dispatch(todosActions.addTodo({
            id: Math.random().toString(),
            text,
            status: 'active'
        }))
    }

    const onRemoveTodoHandler = (id) => {
        dispatch(todosActions.removeTodo({id}))
    }

    const onChangeTodoStatusHandler = (id, status) => {
        dispatch(todosActions.changeStatus({id, status}))
    }

    const todosList = todos.map(t => <TodoItem
        key={t.id}
        id={t.id}
        status={t.status}
        text={t.text}
        onRemoveTodo={onRemoveTodoHandler}
        onChangeTodoStatus={onChangeTodoStatusHandler}
        statusesList={statusesList}
    />)


    return (
        <>
            <input value={text} onChange={onTextChangeHandler} type="text"/>
            <button onClick={onAddTodoHandler}>Добавить</button>
            <ul className={s.todoList}>
                {todosList}
            </ul>
        </>
    );
};

export default TodosList;
