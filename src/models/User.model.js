import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: [true, 'User name is required.']},
        email: {type: String, required: [true, 'User email is required']},
        password: {type: Number, required: [true, 'User password is required']},
        telephones: {type: Array}
    },
    {
        versionKey: false
    }
)

const User = mongoose.model('Users', UserSchema)

export default User