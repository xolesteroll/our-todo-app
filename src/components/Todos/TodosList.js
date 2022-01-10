import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {todosActions} from "../../store/slices/todosSlice";

import TodoItem from "./TodoItem/TodoItem";

import s from './TodosList.module.css'


const TodosList = ({statusFilter}) => {
    const dispatch = useDispatch()

    const todosState = useSelector(state => state.todos)

    const todos = statusFilter !== 'all' ?
        todosState.todos.filter(t => t.status === statusFilter) :
        todosState.todos.filter(t => t.status !== 'deleted')

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

    const todosList = todos.map(t => <TodoItem
        key={t.id}
        id={t.id}
        status={t.status}
        title={t.title}
        description={t.description}
        onRemoveTodo={onRemoveTodoHandler}
        onRestoreTodo={onRestoreTodoHandler}
        onChangeTodoStatus={onChangeTodoStatusHandler}
        statusesList={statusesList}
    />)


    return (
        <>
            <ul className={s.todoList}>
                {todosList}
            </ul>
        </>
    );
};

export default TodosList;
