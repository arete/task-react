
import { taskService } from '../services/api';
import { useState, useEffect } from 'react';
import type { Task, ApiTask } from '../interfaces/Task';

export const useTasks = () => {

    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem("mie_tasks");
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState<boolean>(tasks.length === 0);
    const [error, setError] = useState<string | null>(null);
    // Funzione per aggiungere una task
    const addTask = async (titolo: string) => {
        const nuovaTask = await taskService.create(titolo);
        setTasks([...tasks, nuovaTask]); // Creiamo un nuovo array con la nuova task
    };
    const toggleTask = (id: number) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, completato: !t.completato } : t
        ));
    };
    const deleteTask = async (id: number) => {
        await taskService.delete(id);
        // Teniamo solo le task che NON hanno l'ID che vogliamo eliminare
        setTasks(tasks.filter(task => task.id !== id));
    };

    useEffect(() => {
        if (tasks.length > 0) {
            setLoading(false);
            return;
        }
        taskService.getAll().then(data => {
            const mapped = data.map((t: any) => ({ id: t.id, titolo: t.title, completata: t.completed }));
            setTasks(mapped);
        });
    }, []);

    // 3. SALVATAGGIO AUTOMATICO: Ogni volta che 'tasks' cambia, scrivi nel LocalStorage
    useEffect(() => {
        localStorage.setItem("mie_tasks", JSON.stringify(tasks));
    }, [tasks]); // <--- Questa dipendenza è fondamentale!


    // Tutta la logica di useEffect, addTask, toggleTask, deleteTask va qui...

    return { tasks, addTask, toggleTask, deleteTask, loading, error };
};