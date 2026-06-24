const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/todos';
const AUTH_URL=BASE_URL.replace('/api/todos','/api/auth');

const authHeader=()=>({
    'Content-Type':'application/json',
    'Authorization':`Bearer ${localStorage.getItem('token')}`
});

export const register=async(email,password)=>{
    
    const res=await fetch(`${AUTH_URL}/register`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password})
        
    });
    if(!res.ok) throw new Error('Registration Failed');
        return res.json();
}

export const login=async(email,password)=>{
    const res=await fetch(`${AUTH_URL}/login`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password})
    });
    if(!res.ok) throw new Error('Invalid Mail or Password');
    return res.json();

}

export const getTodos = async () => {
    const res = await fetch(BASE_URL,{headers:authHeader()});
    if (!res.ok) throw new Error('Failed to fetch todos');
    return res.json();
};


export const addTodo = async (title) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ title })
    });
    if (!res.ok) throw new Error('Failed to add todo');
    return res.json();
};

export const toggleTodo = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'PATCH',headers:authHeader()});
    if (!res.ok) throw new Error('Failed to toggle todo');
    return res.json();
};

export const deleteTodo = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' ,headers:authHeader()});
    if (!res.ok) throw new Error('Failed to delete todo');
    return res.json();
};

export const updateTitle=async(id,title)=>{
    const res=await fetch(`${BASE_URL}/${id}`,{
        method:'PATCH',
        headers:authHeader(),
        body:JSON.stringify({title})
    });
    if(!res.ok) throw new Error('Faield to update todo');
    return res.json();
}