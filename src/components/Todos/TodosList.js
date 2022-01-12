import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {todosActions} from "../../store/slices/todosSlice";

import TodoItem from "./TodoItem/TodoItem";

import s from './TodosList.module.css'
import {Link} from "react-router-dom";
import {changeTodoStatus, fetchTodos} from "../../store/thunks/todoThunks";


const TodosList = ({statusFilter}) => {
    const dispatch = useDispatch()

    const todosState = useSelector(state => state.todos)

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    let todos

    if (statusFilter !== 'all' && statusFilter !== 'deleted') {
        todos = todosState.todos.filter(t => t.status === statusFilter)
    }

    if (statusFilter === 'all') {
        todos = todosState.todos
    }

    if (statusFilter === 'deleted') {
        todos = todosState.deletedTodos
    }

    const statusesList = todosState.statuses

    const onRemoveTodoHandler = (id) => {
        dispatch(todosActions.removeTodo({id}))
    }

    const onRestoreTodoHandler = (id) => {
        dispatch(todosActions.restoreTodo({id}))
    }

    const onChangeTodoStatusHandler = (id, status) => {
        const dataObj = {
            id,
            status
        }
        dispatch(changeTodoStatus(dataObj))
    }

    const todosList = todos.length > 0 ? todos.map(t => <TodoItem
            key={t.id}
            id={t.id}
            deleted={statusFilter === 'deleted'}
            status={t.status}
            title={t.title}
            description={t.description}
            onRemoveTodo={onRemoveTodoHandler}
            onRestoreTodo={onRestoreTodoHandler}
            onChangeTodoStatus={onChangeTodoStatusHandler}
            statusesList={statusesList}
        />) :
        <p>No <span>{statusFilter !== 'all' ? statusFilter : ''}</span> Todos yet, try <Link
            to="/add-new">adding</Link> one</p>


    return (
        <>
            <ul className={s.todoList}>
                {todosList}
            </ul>
        </>
    );
};

export default TodosList;
