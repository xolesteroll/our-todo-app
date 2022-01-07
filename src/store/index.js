import {configureStore} from '@reduxjs/toolkit'
import todosSlice from "./slices/todosSlice";


const store = configureStore({
    reducer: {
        todos: todosSlice.reducer
    }
})

export const todosActions = todosSlice.actions

export default store
