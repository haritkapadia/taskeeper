import mongoose from 'mongoose'

export const TaskSchema = mongoose.Schema({
    id: {
        type: mongoose.ObjectId,
    },
    user: {
        type: mongoose.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        default: "My Tasks"
    },
    parent: {
        type: mongoose.ObjectId,
        default: null
    },
    children: [{
        type: mongoose.ObjectId,
        default: null
    }]
}, {
    collection: 'Tasks',
    versionKey: false
})

export default mongoose.model('Task', TaskSchema, 'Tasks')
