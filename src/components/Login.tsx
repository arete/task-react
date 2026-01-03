import { useState } from 'react';
import { supabase } from '../services/supabaseClient';

export const Login = () => {
    const [email, setEmail] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) alert(error.message);
        else alert('Controlla la tua email per il link di accesso!');
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Accedi</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="La tua email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button className="bg-indigo-600 text-white p-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
                    Invia link di accesso
                </button>
            </form>
        </div>
    );
};