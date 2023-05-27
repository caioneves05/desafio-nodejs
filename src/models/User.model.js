import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        id: {type: String},
        name: {type: String, required: [true, 'User name is required.']},
        email: {type: String, required: [true, 'User email is required']},
        password: {type: String, required: [true, 'User password is required']},
        telephones: {type: Array},

        created_at: { type: Date, default: Date.now },
        modified_at: { type: Date, default: Date.now },
    },
    {
        versionKey: false
    }
)

const User = mongoose.model('Users', UserSchema)

export default User