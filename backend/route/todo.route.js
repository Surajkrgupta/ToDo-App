import express from 'express';
import Todo from '../model/Todo.model.js';
import { protect } from '../middleware/auth.middleware.js';
import { getTodos,patchTodo,postTodo,deleteTodo } from '../controller/todo.controller.js';

const router = express.Router();
router.use(protect);

router.get('/', getTodos);

router.post('/', postTodo);

router.patch('/:id', patchTodo);

router.delete('/:id',deleteTodo);

export default router;