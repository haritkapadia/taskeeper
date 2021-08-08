import mongoose from 'mongoose'

export const UserSchema = mongoose.Schema({
    id: {
        type: mongoose.ObjectId,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        required: true,
        type: String,
    }
}, {
    collection: 'User',
    versionKey: false
})

export default mongoose.model('User', UserSchema, 'Users')
