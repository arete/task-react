import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TaskItem } from "./componets/TaskItem"
import { TaskForm } from './componets/TaskForm' // Importa il nuovo component
import type { Task, ApiTask } from "./interfaces/Task";
import { useTasks } from "./hooks/useTask"




function App() {




  const { tasks, addTask, toggleTask, deleteTask, loading, error } = useTasks();

  // 2. Carichiamo dall'API solo se non abbiamo dati salvati localmente



  if (loading) return <p>Caricamento in corso...</p>;
  return (

    <div style={{ padding: '20px' }}>
      <h1>Le mie Task</h1>
      // Nel JSX, dopo il div delle tasks:
      {/* {tasks.some(t => t.completato) && (
        <button onClick={clearCompleted} style={{ marginTop: '20px', width: '100%' }}>
          Pulisci completate
        </button>
      )} */}
      {error && (
        <div style={{ color: 'red', border: '1px solid red', padding: '10px', borderRadius: '5px' }}>
          <p>⚠️ Ops! {error}</p>
          <button onClick={() => window.location.reload()}>Riprova</button>
        </div>
      )}
      {/* Usiamo il nuovo form */}
      <TaskForm onAddTask={addTask} />

      {tasks.map(task => (
        <TaskItem
          key={task.id}
          id={task.id}
          titolo={task.titolo}
          completato={task.completato}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      ))}
    </div>

  )
}

export default App
