import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import TodoItem from "./TodoItem/TodoItem";

import s from './TodosList.module.css'
import {Link} from "react-router-dom";
import {changeTodoStatus, deleteTodo, fetchTodos, restoreTodo} from "../../store/thunks/todoThunks";


const TodosList = ({statusFilter}) => {
    const dispatch = useDispatch()

    const todosState = useSelector(state => state.todos)
    const userId = useSelector(state => state.auth.id)

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    let todos

    if (statusFilter !== 'all' && statusFilter !== 'deleted') {
        todos = todosState.todos.filter(t => t.status === statusFilter)
    }

    if (statusFilter === 'all') {
        todos = todosState.todos.filter(t => t.status !== 'deleted')
    }

    if (statusFilter === 'deleted') {
        todos = todosState.todos.filter(t => t.status === 'deleted')
    }

    const statusesList = todosState.statuses

    const onRemoveTodoHandler = (id) => {
        dispatch(deleteTodo({id}))
    }

    const onRestoreTodoHandler = (id, oldStatus) => {
        dispatch(restoreTodo({id, oldStatus}))
    }

    const onChangeTodoStatusHandler = ({id, status, description, title, author}) => {
        dispatch(changeTodoStatus({
            id,
            status,
            description,
            title,
            author
        }))
    }

    const filteredTodos = todos.filter(t => t.author === userId)

    const todosList = filteredTodos.length > 0 ? filteredTodos.map(t => <TodoItem
            key={t.id}
            id={t.id}
            deleted={statusFilter === 'deleted'}
            status={t.status}
            oldStatus={t.oldStatus}
            title={t.title}
            author={t.author}
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
