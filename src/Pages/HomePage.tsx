import { TaskItem } from '../components/TaskItem'
import { TaskForm } from '../components/TaskForm'
import { useTaskContext } from '../context/TaskContext';
import { TaskFilters } from '../components/TaskFilters';




export const HomePage = () => {

    const { filteredTasks, loading, addTask, toggleTask, deleteTask } = useTaskContext();

    return (
        <>
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    My Tasks
                </h1>
                <p className="text-slate-500 mt-2">Gestisci i tuoi impegni con stile</p>
            </header>

            <TaskForm onAddTask={addTask} />
            <TaskFilters />
            {loading && (
                <div className="flex justify-center p-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            )}



            <div className="space-y-2">
                {filteredTasks.map(task => (
                    <TaskItem key={task.id} {...task} onToggle={toggleTask} onDelete={deleteTask} />
                ))}
            </div>
        </>
    );
}