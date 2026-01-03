import { supabase } from '../services/supabaseClient';
import { useState, useEffect } from 'react';
import type { Task } from '../interfaces/Task';

export const useTasks = () => {

    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem("mie_tasks");
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState<boolean>(tasks.length === 0);
    const [error, setError] = useState<string | null>(null);
    // Funzione per aggiungere una task
    const addTask = async (titolo: string) => {
        const { data, error } = await supabase
            .from('tasks')
            .insert([{ titolo, completato: false }])
            .select(); // Restituisce la task creata con l'ID vero del DB

        if (!error && data) {
            setTasks([data[0], ...tasks]);
        }
    };

    const toggleTask = async (id: number, completato: boolean) => {
        const { error } = await supabase
            .from('tasks')
            .update({ completato: !completato })
            .eq('id', id);

        if (!error) {
            setTasks(tasks.map(t => t.id === id ? { ...t, completato: !completato } : t));
        }
    };
    const deleteTask = async (id: number) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

        if (!error) {
            setTasks(tasks.filter(t => t.id !== id));
        }
    };

    useEffect(() => {
        if (tasks.length > 0) {
            setLoading(false);
            return;
        }
        const fetchTasks = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) setError(error.message);
            else setTasks(data);
            setLoading(false);
        };

        fetchTasks();
    }, []);

    // 3. SALVATAGGIO AUTOMATICO: Ogni volta che 'tasks' cambia, scrivi nel LocalStorage
    useEffect(() => {
        localStorage.setItem("mie_tasks", JSON.stringify(tasks));
    }, [tasks]); // <--- Questa dipendenza è fondamentale!


    // Tutta la logica di useEffect, addTask, toggleTask, deleteTask va qui...

    return { tasks, addTask, toggleTask, deleteTask, loading, error };
};