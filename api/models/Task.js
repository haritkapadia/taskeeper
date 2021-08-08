import mongoose from 'mongoose'

const baseTask = {
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
}

export const TaskSchema = mongoose.Schema({
    ...baseTask,
    id: {
        type: mongoose.ObjectId,
    },
    user: {
        type: mongoose.ObjectId,
        required: true
    },
    history: {
        type: [{
            historyTime: {
                type: Date,
                required: true
            },
            ...baseTask
        }],
        default: []
    }
}, {
    collection: 'Tasks',
    versionKey: false
})

TaskSchema.pre(['save', 'updateOne', 'findOneAndUpdate', 'findByIdAndUpdate', 'updateMany'], function (next) {
    const history = Object.keys(baseTask).reduce((acc, el) => {
        acc[el] = this[el]
        return acc
    }, {})
    history.historyTime = Date.now()
    this.history.push(history)
    next()
})

export default mongoose.model('Task', TaskSchema, 'Tasks')
