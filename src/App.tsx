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

    <div className="min-h-screen py-12 px-4">
      <div className="max-w-md mx-auto">
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
      </div>
    </div>
  )
}

export default App
