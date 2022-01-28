import {createAsyncThunk} from "@reduxjs/toolkit";

const dbUrl = process.env.REACT_APP_FIREBASE_DATABASE_URL


export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (userId) => {
        try {
            const response = await fetch(`${dbUrl}/todos.json`)
            const data = await response.json()
            return {todos: data, userId}
        } catch (e) {
            console.log(e.message)
        }
    }
)

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async ({todo}) => {
        try {
            const response = await fetch(`${dbUrl}/todos.json`, {
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
    async ({id, status, oldStatus}) => {
        try {
            await fetch(`${dbUrl}/todos/${id}.json`, {
                method: 'PATCH',
                body: JSON.stringify({
                    oldStatus: oldStatus,
                    status: status
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return {id, status}
        } catch (e) {
            console.log(e.message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async ({id, status}) => {
        try {
            await fetch(`${dbUrl}/todos/${id}.json`, {
                method: 'PATCH',
                body: JSON.stringify({
                    oldStatus: status,
                    status: 'deleted',
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return {id}
        } catch (e) {
            console.log(e.message)
        }
    }
)

export const restoreTodo = createAsyncThunk(
    'todos/restoreTodo',
    async ({id, oldStatus}) => {
        try {
            await fetch(`${dbUrl}/todos/${id}.json`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status: oldStatus,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return {id, oldStatus}
        } catch (e) {
            console.log(e.message)
        }
    }

)




