import { createContext, useContext, useState, type ReactNode } from 'react';
import { useTasks } from '../hooks/useTask'; // Usiamo l'hook che abbiamo già creato!
import type { Task } from '../interfaces/Task';

// 1. Aggiungiamo i tipi per i filtri
type FilterStatus = 'all' | 'active' | 'completed';

// 2. Definiamo cosa conterrà il nostro Context
interface TaskContextType {
    tasks: Task[];           // Tutte le task (dal server/localStorage)
    filteredTasks: Task[];   // Solo quelle da visualizzare
    filter: FilterStatus;
    setFilter: (f: FilterStatus) => void;
    addTask: (titolo: string) => void;
    deleteTask: (id: number) => void;
    toggleTask: (id: number) => void;
    loading: boolean;
}

// 2. Creiamo il Context vero e proprio
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// 3. Creiamo il Provider (il componente che avvolge l'app)
export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const taskLogic = useTasks(); // Prendiamo la logica dall'hook
    const [filter, setFilter] = useState<FilterStatus>('all');
    // Logica di filtraggio calcolata "al volo"

    const filteredTasks = taskLogic.tasks.filter(t => {
        if (filter === 'active') return !t.completato;
        if (filter === 'completed') return t.completato;
        return true; // 'all'
    });
    return (
        <TaskContext.Provider value={{ ...taskLogic, filteredTasks, filter, setFilter }}>
            {children}
        </TaskContext.Provider>
    );
};

// 4. Hook personalizzato per usare il Context facilmente
export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTaskContext deve essere usato dentro un TaskProvider");
    return context;
};