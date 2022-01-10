import React, {useState} from 'react';
import {todosActions} from "../../../store/slices/todosSlice";
import {useDispatch} from "react-redux";

import c from "./AddTodo.module.css"

const AddTodo = () => {
    const [title, setText] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()


    const onTextChangeHandler = (e) => {
        const text = e.target.value
        setText(text)
    }

    const onDescriptionChangeHandler = (e) => {
        const descr = e.target.value
        console.log(descr)
        setDescription(descr)
    }

    const onAddTodoHandler = (e) => {
        e.preventDefault()

        dispatch(todosActions.addTodo({
            id: Math.random().toString(),
            title,
            description,
            status: 'active'
        }))

        setText('')
        setDescription('')
    }
    return (
        <form className={c.addTodoForm} onSubmit={onAddTodoHandler}>
            <label htmlFor="title">Enter the title</label>
            <input name="title" value={title} onChange={onTextChangeHandler} type="text"/>
            <label htmlFor="description">Describe the Todo</label>
            <textarea name="description" value={description} onChange={onDescriptionChangeHandler} type="text"/>
            <button type="submit">Добавить</button>
        </form>
    );
};

export default AddTodo;
