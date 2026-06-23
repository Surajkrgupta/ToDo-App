import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useEffect,useState } from 'react'
import { getTodos,addTodo,toggleTodo,deleteTodo,updateTitle  } from './api.js'
import TodoForm from './TodoForm.jsx'
import TodoList from './TodoList.jsx'

function App() {
  const [todos,setTodos]=useState([]);
  const [loading, setLoading]=useState(true);
  const [error,setError]=useState(null);
  useEffect(()=>{
    getTodos()
      .then((data) => { console.log('API returned:', data); setTodos(data); })
      .catch(()=>setError("Unable To Load"))
      .finally(()=>setLoading(false));
},[]);

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

    if (loading) return <p>Loading...</p>;

  return (
    <div className='app'>
      {error && <p>{error}</p>}
      <TodoForm onAdd={handleAdd}/>
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete}/>
    </div>
  );
}

export default App
