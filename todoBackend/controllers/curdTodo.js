import todoSchema from '../models/curdModel.js'

export const getUserTodo = async (req, res) => {
    try {
        const todos = await todoSchema.find(); // Get all todos
        res.status(200).json({ your_todo: todos }); // Send response to client
    } catch (error) {
        console.error("Error fetching todos:", error); // Log actual error
        res.status(500).json({ message: "Something went wrong.", error: error.message });
    }
};

export const addTodo = async (req, res) => {
    const { title, description, status } = req.body;
    console.log("this is body i got: ", req.body);

    if (!title || !description) {
        res.status(400)
        throw new Error("All fields are mindatry");
    }
    
    try {
        const todoCreated = await todoSchema.create({
            title, description, status
        })
        res.status(200).json({todoCreated})
    } catch (error) {
        throw new Error("something went wrong.");
    }
}

export const updateTodo = async (req, res) => {
    const { id, title, description, status } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Todo ID is required." });
    }

    try {
        const todo = await todoSchema.findById(id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found." });
        }

        // Check if there is any actual change
        const isSameTitle = title === todo.title;
        const isSameDescription = description === todo.description;
        const isSameStatus = status === todo.status;

        if (isSameTitle && isSameDescription && isSameStatus) {
            return res.status(409).json({ message: "No changes detected in the todo." });
        }

        // Proceed to update only changed fields
        const updatedTodo = await todoSchema.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true } // return the updated document
        );

        res.status(200).json({ message: "Todo updated successfully.", updatedTodo });

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Server error." });
    }
};

export const deleteTodo = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Todo ID is required." });
    }

    try {
        const todo = await todoSchema.findById(id);
        if (!todo) {
            res.status(400).json({message: "todo not found"})
        }
        const deletedTodo = await todoSchema.findByIdAndDelete(id)
        res.status(200).json({ message: "Todo deleted successfully.", deletedTodo });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Server error." });
    }
}