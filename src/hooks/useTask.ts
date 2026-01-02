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
    const addTask = (titolo: string) => {
        const nuovaTask: Task = {
            id: Date.now(), // Usiamo il timestamp come ID univoco
            titolo: titolo,
            completato: false
        };
        setTasks([...tasks, nuovaTask]); // Creiamo un nuovo array con la nuova task
    };
    const toggleTask = (id: number) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, completato: !t.completato } : t
        ));
    };
    const deleteTask = (id: number) => {
        // Teniamo solo le task che NON hanno l'ID che vogliamo eliminare
        setTasks(tasks.filter(task => task.id !== id));
    };

    useEffect(() => {
        if (tasks.length > 0) {
            setLoading(false);
            return;
        }

        const fetchTasks = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
                if (!response.ok) throw new Error("Errore API");
                const data: ApiTask[] = await response.json();
                const mapped = data.map(t => ({ id: t.id, titolo: t.title, completato: t.completed }));
                setTasks(mapped);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Errore");
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    // 3. SALVATAGGIO AUTOMATICO: Ogni volta che 'tasks' cambia, scrivi nel LocalStorage
    useEffect(() => {
        localStorage.setItem("mie_tasks", JSON.stringify(tasks));
    }, [tasks]); // <--- Questa dipendenza è fondamentale!







    useEffect(() => {
        // Funzione asincrona per recuperare i dati
        const fetchTasks = async () => {
            try {
                setError(null); // Resetta l'errore prima di ogni tentativo
                const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
                // Controllo se la risposta è ok (status 200-299)
                if (!response.ok) {
                    throw new Error(`Errore del server: ${response.status}`);
                }
                const data: ApiTask[] = await response.json();

                // Trasformiamo i dati dell'API nel nostro formato Task
                const mappedTasks: Task[] = data.map(t => ({
                    id: t.id,
                    titolo: t.title,
                    completato: t.completed
                }));

                setTasks(mappedTasks);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Si è verificato un errore imprevisto.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []); // Array vuoto = esegui solo una volta al montaggio del componente


    // Tutta la logica di useEffect, addTask, toggleTask, deleteTask va qui...

    return { tasks, addTask, toggleTask, deleteTask, loading, error };
};