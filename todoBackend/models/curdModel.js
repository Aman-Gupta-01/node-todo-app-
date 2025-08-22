import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Give title to your todo."]
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, {timestamps:true})

export default mongoose.model('todo', todoSchema)