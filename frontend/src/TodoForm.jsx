import React from 'react'
import { useState } from 'react'

export default function TodoForm({onAdd}) {
    const [title,setTitle]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!title.trim()) return;
        onAdd(title);
        setTitle('');
    };
  return (
    <><h1 className='block text-center text-shadow-blue-800'>My Todo's</h1>
    <form className='todo-form ' onSubmit={handleSubmit}>
      
      
        <input value={title} placeholder='Add a Todo' onChange={(e)=>setTitle(e.target.value)}/>
        <button type='submit'>Add</button>
    </form></>
  );
}
