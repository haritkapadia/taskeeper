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
    datetime: {
        type: Boolean,
        default: false
    },
    startTime: {
        type: Date,
        default: null
    },
    duration: {
        type: Number,
        default: 0
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