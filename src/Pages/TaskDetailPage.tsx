// src/pages/TaskDetailPage.tsx
import { useParams, Link } from 'react-router-dom';
import type { Task } from '../interfaces/Task';

interface Props {
    tasks: Task[];
}

export const TaskDetailPage = ({ tasks }: Props) => {
    const { id } = useParams<{ id: string }>(); // Prende l'id dall'URL
    const task = tasks.find(t => t.id === Number(id));

    if (!task) {
        return (
            <div className="text-center p-10">
                <p className="text-red-500 mb-4">Task non trovata!</p>
                <Link to="/" className="text-indigo-600 underline">Torna alla Home</Link>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
                ← Torna alla lista
            </Link>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{task.titolo}</h2>
            <div className="flex items-center gap-2 mb-6">
                <span className="text-slate-500">Stato:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${task.completato ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {task.completato ? 'Completata' : 'In corso'}
                </span>
            </div>
            <p className="text-slate-400 text-sm italic">ID Task: {task.id}</p>
        </div>
    );
};