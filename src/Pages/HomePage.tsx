import type { Task } from '../interfaces/Task';
import { TaskItem } from '../componets/TaskItem'
import { TaskForm } from '../componets/TaskForm'
import { useTasks } from "../hooks/useTask"

interface Props {
    tasks: Task[];
}


export const HomePage = ({ tasks }: Props) => {
    const { addTask, toggleTask, deleteTask, loading, error } = useTasks();

    return (
        <>
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    My Tasks
                </h1>
                <p className="text-slate-500 mt-2">Gestisci i tuoi impegni con stile</p>
            </header>

            <TaskForm onAddTask={addTask} />

            {loading && (
                <div className="flex justify-center p-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100 mb-6">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                {tasks.map(task => (
                    <TaskItem key={task.id} {...task} onToggle={toggleTask} onDelete={deleteTask} />
                ))}
            </div>
        </>
    );
}