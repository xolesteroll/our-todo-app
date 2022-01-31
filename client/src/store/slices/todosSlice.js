import {createSlice} from "@reduxjs/toolkit";

import {addTodo, changeTodoStatus, deleteTodo, fetchTodos, restoreTodo} from "../thunks/todoThunks";

const initialState = {
    todos: [],
    quantity: {
        all: 0,
        active: 0,
        done: 0,
        hold: 0,
        deleted: 0
    },
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
    isFetching: false,
    isInitialFetch: true
}


const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // onChangeStatus(state, {payload}) {
        //     const [oldStatus, status] = payload
        //     console.log(oldStatus, status)
        //     state.quantity[`${oldStatus}`]--
        //     state.quantity[`${status}`]++
        // }
        setIsInitialFetch(state, {payload}) {
            state.isInitialFetch = payload
        },
        resetQty(state) {
            state.quantity = {
                all: 0,
                active: 0,
                done: 0,
                hold: 0,
                deleted: 0
            }
        }
    },
    extraReducers: {
        [addTodo.pending]: (state) => {
            state.isFetching = true
        },
        [addTodo.fulfilled]: (state, {payload}) => {
            state.todos.push(payload)
            state.quantity['all'] += 1
            state.quantity['active'] += 1
            state.isFetching = false
        },
        [fetchTodos.pending]: (state) => {
            state.isFetching = true
        },
        [fetchTodos.fulfilled]: (state, {payload}) => {
            const loadedTodos = []
            const todos = payload.todos
            for (const key in todos) {
                if (payload)
                    loadedTodos.push({
                        id: key,
                        title: todos[key].title,
                        description: todos[key].description,
                        status: todos[key].status,
                        oldStatus: todos[key].oldStatus,
                        author: todos[key].author
                    })
                if (state.isInitialFetch && payload.userId === todos[key].author) {
                    state.quantity[todos[key].status]++
                    state.quantity['all'] = todos[key].status !==
                    'deleted' ? state.quantity['all'] + 1 :
                        state.quantity['all']
                }
            }
            state.todos = loadedTodos
            state.isFetching = false
            state.isInitialFetch = false
        },
        [changeTodoStatus.pending]: (state) => {
            state.isFetching = true
        },
        [changeTodoStatus.fulfilled]: (state, {payload}) => {
            const todo = state.todos.find(t => t.id === payload.id)
            todo.oldStatus = todo.status
            todo.status = payload.status
            state.quantity[todo.oldStatus] -= 1
            state.quantity[payload.status] += 1
            state.isFetching = false
        },
        [deleteTodo.pending]: (state) => {
            state.isFetching = true
        },
        [deleteTodo.fulfilled]: (state, {payload}) => {
            const todo = state.todos.find(t => t.id === payload.id)
            todo.oldStatus = todo.status
            todo.status = 'deleted'
            state.quantity[todo.oldStatus] -= 1
            state.quantity['deleted'] += 1
            state.quantity['all'] -= 1
            state.isFetching = false
        },
        [restoreTodo.pending]: (state) => {
            state.isFetching = true
        },
        [restoreTodo.fulfilled]: (state, {payload}) => {
            const todo = state.todos.find(t => t.id === payload.id)
            todo.status = todo.oldStatus
            state.quantity[todo.status] += 1
            state.quantity['deleted'] -= 1
            state.quantity['all'] += 1
            state.isFetching = false
        }
    }
})

export const todosActions = todosSlice.actions

const todosReducer = todosSlice.reducer

export default todosReducer
