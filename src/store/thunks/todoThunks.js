import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        try {
            const response = await fetch('https://my-todo-4ba56-default-rtdb.firebaseio.com/todos.json')
            const data = await response.json()
            console.log(data)
            return data
        } catch (e) {
            console.log(e.message)
        }
    }
)

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (todo) => {
        try {
            const response = await fetch('https://my-todo-4ba56-default-rtdb.firebaseio.com/todos.json', {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const responseData = await response.json()
            return {
                id: responseData.name,
                ...todo
            }
        } catch (e) {
            console.log(e.message)
        }

    }
)

export const changeTodoStatus = createAsyncThunk(
    'todos/changeStatus',
    async (data) => {
        try {
            const response = await fetch(`https://my-todo-4ba56-default-rtdb.firebaseio.com/todos.json/${data.id}/status`, {
                method: 'PATCH',
                body: (data.status),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const responseData = response.json()
            console.log(responseData)
            return {id: data.id, status: data.status}
        } catch (e) {
            console.log(e.message)
        }
    }
)




