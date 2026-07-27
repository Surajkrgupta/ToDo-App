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
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        {isLogin ? "Login" : "Register"}
      </h1>

      

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:flex-row"
      >
        <input
          type="email"
          placeholder="Email"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      {error && (
        <p className="mt-4 rounded bg-red-100 p-3 text-center text-red-600">
          {error}
        </p>
      )}

      <p className="mt-6 text-center text-gray-600">
        {isLogin
          ? "Don't have an account?"
          : "Already have an account?"}

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="ml-2 font-semibold text-indigo-600 hover:underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  </div>
);
}