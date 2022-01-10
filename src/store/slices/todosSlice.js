import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    todos: [
        {
            id: 't1',
            title: 'Some text fot t1 todo',
            description: 'Some description',
            status: 'active'
        },{
            id: 't2',
            title: 'Some text fot t2 todo',
            description: 'Some description',
            status: 'active'
        },{
            id: 't3',
            title: 'Some text fot t3 todo',
            description: 'Some description',
            status: 'active'
        },
    ],
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
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },
        removeTodo(state, {payload}) {
            const todo = state.todos.find(t => t.id === payload.id)
            todo.status = 'deleted'
        },
        restoreTodo(state, {payload}) {
            const todo = state.todos.find(t => t.id === payload.id)
            todo.status = 'active'
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
