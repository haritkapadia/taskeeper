import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
    id: {
        type: mongoose.ObjectId,
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
}, {
    collection: 'Tasks',
    versionKey: false
})

export default mongoose.model('Task', TaskSchema, 'Tasks')