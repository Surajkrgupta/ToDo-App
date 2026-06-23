const BASE_URL = 'http://localhost:3000/api/todos';

export const getTodos = async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Failed to fetch todos');
    return res.json();
};

export const addTodo = async (title) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    if (!res.ok) throw new Error('Failed to add todo');
    return res.json();
};

export const toggleTodo = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'PATCH' });
    if (!res.ok) throw new Error('Failed to toggle todo');
    return res.json();
};

export const deleteTodo = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete todo');
    return res.json();
};

export const updateTitle=async(id,title)=>{
    const res=await fetch(`${BASE_URL}/${id}`,{
        method:'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({title})
    });
    if(!res.ok) throw new Error('Faield to update todo');
    return res.json();
}