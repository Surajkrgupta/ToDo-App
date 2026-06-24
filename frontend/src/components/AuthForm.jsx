import React, { useState } from 'react'

export default function AuthForm() {
    const [isLogin,setIsLogin]=useState(true);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const data = isLogin
                ? await login(email, password)
                : await register(email, password);
            localStorage.setItem('token', data.token);
            onAuth();
        } catch (err) {
            setError(err.message);
        }
    };

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" />
            <input type="text" />
        </form>
        <button action='submit'>Submit</button>
    </div>
  )
}
