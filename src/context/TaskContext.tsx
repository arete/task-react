import { createContext, useContext, type ReactNode } from 'react';
import { useTasks } from '../hooks/useTask'; // Usiamo l'hook che abbiamo già creato!
import type { Task } from '../interfaces/Task';

// 1. Definiamo cosa conterrà il nostro Context
interface TaskContextType {
    tasks: Task[];
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

    return (
        <TaskContext.Provider value={taskLogic}>
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