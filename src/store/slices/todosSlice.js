import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    todos: [
        {
            id: 't1',
            text: 'Some text fot t1 todo',
            status: 'active'
        },{
            id: 't2',
            text: 'Some text fot t2 todo',
            status: 'active'
        },{
            id: 't3',
            text: 'Some text fot t3 todo',
            status: 'active'
        },
    ],
    statuses: [
        'active',
        'done',
        'hold'
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
            state.todos = state.todos.filter(t => t.id !== payload.id)
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
