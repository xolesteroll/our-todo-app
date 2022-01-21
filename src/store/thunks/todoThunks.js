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
            debugger
            await fetch(`https://my-todo-4ba56-default-rtdb.firebaseio.com/todos/${data.id}.json`, {
                method: 'PATCH',
                body: JSON.stringify({
                    oldStatus: data.oldStatus,
                    status: data.status
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return {id: data.id, status: data.status}
        } catch (e) {
            console.log(e.message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (data) => {
        try {
            await fetch(`https://my-todo-4ba56-default-rtdb.firebaseio.com/todos/${data.id}.json`, {
                method: 'PATCH',
                body: JSON.stringify({
                    oldStatus: data.status,
                    status: 'deleted',
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return {id: data.id}
        } catch (e) {
            console.log(e.message)
        }
    }
)

export const restoreTodo = createAsyncThunk(
    'todos/restoreTodo',
    async (data) => {
        try {
            await fetch(`https://my-todo-4ba56-default-rtdb.firebaseio.com/todos/${data.id}.json`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status: data.oldStatus,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return {id: data.id, oldStatus: data.oldStatus}
        } catch (e) {
            console.log(e.message)
        }
    }

)




