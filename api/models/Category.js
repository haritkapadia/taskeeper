import mongoose from 'mongoose'

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.ObjectId,
        required: true
    }
},
    {
        collection: 'Tasks',
        versionKey: false
    })

export default mongoose.model('Category', CategorySchema, 'Categories')

