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
    ],
    isFetching: false
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: {
        [addTodo.pending]: (state) => {
            state.isFetching = true
        },
        [addTodo.fulfilled]: (state, {payload}) => {
            state.todos.push(payload)
            state.isFetching = false
        },
        [fetchTodos.pending]: (state) => {
            // state.isFetching = true
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
            state.isFetching = false
        },
        [changeTodoStatus.pending]: (state) => {
            state.isFetching = true
        },
        [changeTodoStatus.fulfilled]: (state, {payload}) => {
            const todo = state.todos.find(t => t.id === payload.id)
            todo.oldStatus = todo.status
            todo.status = payload.status
            state.isFetching = false
        },
        [deleteTodo.pending]: (state) => {
            state.isFetching = true
        },
        [deleteTodo.fulfilled]: (state, {payload}) => {
            const todo = state.todos.find(t => t.id === payload.id)
            todo.oldStatus = todo.status
            todo.status = 'deleted'
            state.isFetching = false
        },
        [restoreTodo.pending]: (state, {payload}) => {
            state.isFetching = true
        },
        [restoreTodo.fulfilled]: (state, {payload}) => {
            const todo = state.todos.find(t => t.id === payload.id)
            todo.status = todo.oldStatus
            state.isFetching = false
        }
    }
})

export const todosActions = todosSlice.actions

const todosReducer = todosSlice.reducer

export default todosReducer
