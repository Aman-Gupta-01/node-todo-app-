import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "This username is already taken."]
    },
    password: {
        type: String,
        required: [true, "Password is required."],
    },
    name: {
        type: String,
        required: [true, "Name is required."],
    },
})

export default mongoose.model('user', userSchema)