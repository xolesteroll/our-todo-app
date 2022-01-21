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
    async (data) => {
        try {
            const response = await fetch(`https://my-todo-4ba56-default-rtdb.firebaseio.com/todos.json`, {
                method: 'POST',
                body: JSON.stringify(data.todo),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const responseData = await response.json()
            return {
                id: responseData.name,
                ...data.todo
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
            const response = await fetch(`https://my-todo-4ba56-default-rtdb.firebaseio.com/todos/${data.id}.json`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: data.title,
                    description: data.description,
                    status: data.status
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const responseData = await response.json()
            console.log(responseData)
            return {id: data.id, status: data.status}
        } catch (e) {
            console.log(e.message)
        }
    }
)




