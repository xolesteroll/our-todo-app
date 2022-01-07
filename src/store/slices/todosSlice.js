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
    ]
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action) {
            return state.todos.concat(action.payload)
        },
        removeTodo(state, id) {
            return state.todos.filter(t => t.id !== id)
        },
        changeStatus(state, action) {
            const todo = state.todos.find(t => t.id === action.id)
            todo.status = action.status
        }
    }
})

export default todosSlice
