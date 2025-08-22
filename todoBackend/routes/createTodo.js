import express from 'express'
import { getUserTodo, addTodo, updateTodo, deleteTodo } from '../controllers/curdTodo.js'
import { validateToken } from '../config/validateToken.js';
const router = express.Router()

// post api to create todo
router.route('/')
    .get(validateToken, getUserTodo)
    .post(addTodo)
    .put(updateTodo)
    .delete(deleteTodo)

export default router;