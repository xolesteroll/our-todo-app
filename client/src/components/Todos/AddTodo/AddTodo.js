import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {addTodo} from "../../../store/thunks/todoThunks";
import {useNavigate} from "react-router-dom";
import AddTodoForm from "./AddTodoForm/AddTodoForm";

import c from "./AddTodo.module.css"

const AddTodo = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userId = useSelector(state => state.auth.id)

    const onAddTodoHandler = (todo) => {
        dispatch(addTodo(
            {
                todo: {
                    ...todo,
                }
            }))
        navigate('/my-todos')
    }

    return (
        <div className={c.addTodoFormWrapper}>
        <AddTodoForm onAddTodoHandler={onAddTodoHandler}/>
        </div>
    );
};

export default AddTodo;
