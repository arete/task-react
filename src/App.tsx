import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {TaskItem } from "./TaskItem"
import { TaskForm } from './TaskForm' // Importa il nuovo component




interface Task {
  id: number,
  titolo:string,
  completato: boolean
  }

interface ApiTask {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  // Funzione per aggiungere una task
  const addTask = (titolo: string) => {
    const nuovaTask: Task = {
      id: Date.now(), // Usiamo il timestamp come ID univoco
      titolo: titolo,
      completato: false
    };
    setTasks([...tasks, nuovaTask]); // Creiamo un nuovo array con la nuova task
  };
  
  //inizializziamo lo stato con una lista di task
  const [tasks,setTasks] = useState<Task[]>([
    { id: 1, titolo: "Imparare React", completato: false },
    { id: 2, titolo: "Configurare Docker", completato: true }
  ]);   
  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completato: !t.completato } : t
    ));
  };
  const [loading, setLoading] = useState<boolean>(true); 
  useEffect(() => {
    // Funzione asincrona per recuperare i dati
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const data: ApiTask[] = await response.json();
        
        // Trasformiamo i dati dell'API nel nostro formato Task
        const mappedTasks: Task[] = data.map(t => ({
          id: t.id,
          titolo: t.title,
          completato: t.completed
        }));

        setTasks(mappedTasks);
      } catch (error) {
        console.error("Errore nel caricamento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // Array vuoto = esegui solo una volta al montaggio del componente

  

  
if (loading) return <p>Caricamento in corso...</p>;
  return (
  
    <div style={{ padding: '20px' }}>
      <h1>Le mie Task</h1>
      {/* Usiamo il nuovo form */}
      <TaskForm onAddTask={addTask} /> 

      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          id={task.id}
          titolo={task.titolo}
          completato={task.completato}
          onToggle={toggleTask}
        />
      ))}
    </div>
  
  )
}

export default App
