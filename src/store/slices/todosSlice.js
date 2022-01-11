import {createSlice} from "@reduxjs/toolkit";

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
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
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
        }
    }
})

export const todosActions = todosSlice.actions

const todosReducer = todosSlice.reducer

export default todosReducer
