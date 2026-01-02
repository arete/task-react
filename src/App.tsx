import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {TaskItem } from "./TaskItem"

interface Task {
  id: number,
  titolo:string,
  completato: boolean
  }


function App() {
  const [count, setCount] = useState(0)
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

  return (
  
    <div style={{ padding: '20px' }}>
      <h1>Le mie Task</h1>
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
