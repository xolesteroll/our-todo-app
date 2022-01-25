import {createSlice} from "@reduxjs/toolkit";

import {addTodo, changeTodoStatus, deleteTodo, fetchTodos, restoreTodo} from "../thunks/todoThunks";

const initialState = {
    todos: [],
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
        },
        {
            id: 'deleted',
            label: 'Deleted',
            color: 'red'
        }
    ]
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: {
        [addTodo.fulfilled]: (state, {payload}) => {
            state.todos.push(payload)
        },
        [fetchTodos.fulfilled]: (state, {payload}) => {
            const loadedTodos = []
            for (const key in payload) {
                if (payload)
                    loadedTodos.push({
                        id: key,
                        title: payload[key].title,
                        description: payload[key].description,
                        status: payload[key].status,
                        oldStatus: payload[key].oldStatus,
                        author: payload[key].author
                    })
            }
            state.todos = [...loadedTodos]
        },
        [changeTodoStatus.fulfilled]: (state, {payload}) => {
            const todo = state.todos.find(t => t.id === payload.id)
            todo.oldStatus = todo.status
            todo.status = payload.status
        },
        [deleteTodo.fulfilled]: (state, {payload}) => {
            const todo = state.todos.find(t => t.id === payload.id)
            todo.oldStatus = todo.status
            todo.status = 'deleted'
        },
        [restoreTodo.fulfilled]: (state, {payload}) => {
            const todo = state.todos.find(t => t.id === payload.id)
            todo.status = todo.oldStatus
        }
    }
})

export const todosActions = todosSlice.actions

const todosReducer = todosSlice.reducer

export default todosReducer
