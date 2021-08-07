import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
    id: {
        type: mongoose.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    category: {
        type: String,
        required: true,
        default: "My Tasks"
    }
})

export default mongoose.model('Task', TaskSchema, 'Tasks')