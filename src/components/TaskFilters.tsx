// src/components/TaskFilters.tsx
import { useTaskContext } from '../context/TaskContext';

export const TaskFilters = () => {
    const { filter, setFilter, tasks } = useTaskContext();

    const activeCount = tasks.filter(t => !t.completato).length;

    return (
        <div className="flex flex-col gap-4 mb-6">
            <div className="flex justify-center gap-2">
                {(['all', 'active', 'completed'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>
            <p className="text-center text-sm text-slate-500">
                Hai <span className="font-bold text-indigo-600">{activeCount}</span> task rimaste
            </p>
        </div>
    );
};