import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {todosActions} from "../../store/slices/todosSlice";

import TodoItem from "./TodoItem/TodoItem";

import s from './TodosList.module.css'
import {Link} from "react-router-dom";


const TodosList = ({statusFilter}) => {
    const dispatch = useDispatch()

    const todosState = useSelector(state => state.todos)

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
        dispatch(todosActions.changeStatus({id, status}))
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
        <p>No <span>{statusFilter !== 'all' ? statusFilter : ''}</span> Todos yet, try <Link to="/add-new">adding</Link> one</p>


    return (
        <>
            <ul className={s.todoList}>
                {todosList}
            </ul>
        </>
    );
};

export default TodosList;
