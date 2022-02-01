const {Schema, model, ObjectId} = require('mongoose')

const Todo = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
    user: {type: ObjectId, ref: 'User'}
})

module.exports = model('Todo', Todo)
