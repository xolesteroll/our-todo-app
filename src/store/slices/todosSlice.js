import {createSlice} from "@reduxjs/toolkit";

import {addTodo, changeTodoStatus, fetchTodos} from "../thunks/todoThunks";

const initialState = {
    todos: [],
    deletedTodos: [],
    statuses: [
        {
            id: 'active',
            label: 'Active',
            color: 'green'
        },
        {
            id: 'done',
            label: 'Done',
            color: 'blue'
        },
        {
            id: 'hold',
            label: 'Hold',
            color: 'grey'
        }
    ]
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        removeTodo(state, {payload}) {
            const todo = state.todos.find(t => t.id === payload.id)
            state.deletedTodos.push(todo)
            state.todos = state.todos.filter(t => t.id !== payload.id)
        },
        restoreTodo(state, {payload}) {
            const todo = state.deletedTodos.find(t => t.id === payload.id)
            state.todos.push(todo)
            state.deletedTodos = state.deletedTodos.filter(t => t.id !== payload.id)
        },
        changeStatus(state, {payload}) {
            const todo = state.todos.find(t => t.id === payload.id)
            todo.status = payload.status
        },
    },
    extraReducers: {
        [addTodo.fulfilled]: (state, action) => {
            console.log(action)
            state.todos.push(action.payload)
        },
        [fetchTodos.fulfilled]: (state, {payload}) => {
            const loadedTodos = []
            for (const key in payload) {
                loadedTodos.push({
                    id: key,
                    title: payload[key].title,
                    description: payload[key].description,
                    status: payload[key].status
                })
            }
            state.todos = [...loadedTodos]
        },
        [changeTodoStatus.fulfilled]: (state, action) => {
            const todo = state.todos.find(t => t.id === action.payload.id)
            todo.status = action.payload.status
        }
    }
})

export const todosActions = todosSlice.actions

const todosReducer = todosSlice.reducer

export default todosReducer
