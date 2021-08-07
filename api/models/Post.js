import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
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

export default mongoose.model('Posts', PostSchema, 'Tasks')