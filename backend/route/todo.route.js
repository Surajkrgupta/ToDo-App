import express from 'express';
import Todo from '../model/Todo.model.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(protect);

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.userId });
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: 'Title is required' });
        const newTodo = await Todo.create({ title, user: req.userId });
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const todo = await Todo.findOne({ _id: id, user: req.userId });
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        if (title !== undefined) todo.title = title;
        else todo.completed = !todo.completed;
        await todo.save();
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Todo.findOneAndDelete({ _id: id, user: req.userId });
        if (!deleted) return res.status(404).json({ message: 'Todo not found' });
        res.status(200).json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;