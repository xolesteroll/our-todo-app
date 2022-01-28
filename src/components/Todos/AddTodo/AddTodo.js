import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {addTodo} from "../../../store/thunks/todoThunks";
import {useNavigate} from "react-router-dom";
import AddTodoForm from "./AddTodoForm/AddTodoForm";

const AddTodo = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userId = useSelector(state => state.auth.id)

    const onAddTodoHandler = (todo) => {
        dispatch(addTodo(
            {
                todo: {
                    ...todo,
                    status: 'active',
                    oldStatus: 'active',
                    author: userId
                }
            }))
        navigate('/my-todos')
    }

    return (
        <AddTodoForm onAddTodoHandler={onAddTodoHandler}/>
    );
};

export default AddTodo;
