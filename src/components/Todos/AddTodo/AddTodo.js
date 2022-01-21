import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import c from "./AddTodo.module.css"
import {addTodo} from "../../../store/thunks/todoThunks";

const AddTodo = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()

    const userId = useSelector(state => state.auth.id)


    const onTextChangeHandler = (e) => {
        const text = e.target.value
        setTitle(text)
    }

    const onDescriptionChangeHandler = (e) => {
        const descr = e.target.value
        console.log(descr)
        setDescription(descr)
    }

    const onAddTodoHandler = (e) => {
        e.preventDefault()

        dispatch(addTodo(
            {
                todo: {
                    title,
                    description,
                    status: 'active',
                    author: userId
                }
            }))

        setTitle('')
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
