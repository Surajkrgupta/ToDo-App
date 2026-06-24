import { useState } from 'react';
import { login, register } from '../api.js';

export default function AuthForm({ onAuth }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

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
        <div className="app">
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            {error && <p className="error">{error}</p>}
            <form className="todo-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#666' }}>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', marginLeft: '6px' }}
                >
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </p>
        </div>
    );
}