import './App.css'
import { useEffect, useState } from 'react'
import { getTodos, addTodo, toggleTodo, deleteTodo, updateTitle } from './api.js'
import TodoForm from './TodoForm.jsx'
import TodoList from './TodoList.jsx'
import AuthForm from './components/AuthForm.jsx'

function App() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isLoginIn, setIsLoginIn] = useState(!!localStorage.getItem('token'));


    useEffect(() => {
        if (!isLoginIn) {
            setLoading(false);
            return;
        }
        getTodos()
            .then(setTodos)
            .catch(() => setError("Unable To Load"))
            .finally(() => setLoading(false));
    }, [isLoginIn]);
    const handleAuth = () => setIsLoginIn(true);



    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoginIn(false);
        setTodos([]);
    };

    const handleAdd = async (title) => {
        try {
            const newTodo = await addTodo(title);
            setTodos((prev) => [...prev, newTodo]);
        } catch {
            setError('Could not add todo');
        }
    };

    const handleToggle = async (id) => {
        try {
            const updated = await toggleTodo(id);
            setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
        } catch {
            setError('Could not update todo');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            setTodos((prev) => prev.filter((t) => t._id !== id));
        } catch {
            setError('Could not delete todo');
        }
    };
    if (!isLoginIn) return <AuthForm onAuth={handleAuth} />;
    if (loading) return <p>Loading...</p>;

    return (
        <div className='app'>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
            {error && <p>{error}</p>}
            <TodoForm onAdd={handleAdd} />
            <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
        </div>
    );
}

export default App
