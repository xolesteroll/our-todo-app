class TodosApi {
    baseUrl = 'https://my-todo-4ba56-default-rtdb.firebaseio.com/'

    async getAllTodos() {
        const response = await fetch(this.baseUrl + 'todos.json')
        const data = response.json()
        console.log(data)
        return data
    }

    async addTodo(todo) {
        try {
            const response = await fetch(this.baseUrl + 'todos.json', {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = response.json()
            console.log(data)
            return data
        } catch (e) {
            console.log(e.message)
        }
    }

}

export default TodosApi


