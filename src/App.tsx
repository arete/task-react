
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// Importa il nuovo component


import { Route, Routes, Link } from "react-router-dom"
import { AboutPage } from "./Pages/AboutPage"
import { HomePage } from "./Pages/HomePage"
import { TaskDetailPage } from "./Pages/TaskDetailPage"
import { useTasks } from "./hooks/useTask"

function App() {
  const { tasks, addTask, toggleTask, deleteTask, loading, error } = useTasks();

  return (
    <div>

      <nav className="p-4 bg-white shadow-sm flex gap-4 justify-center">
        <Link to="/" className="text-indigo-600 hover:font-bold">Home</Link>
        <Link to="/about" className="text-indigo-600 hover:font-bold">Info</Link>
      </nav>

      <div className="min-h-screen py-12 px-4">
        <div className="max-w-md mx-auto">
          <Routes>
            {/* Pagina Principale (Task List) */}
            <Route path="/" element={<HomePage tasks={tasks} />} />
            {/* Pagina About */}
            <Route path="/about" element={<AboutPage />} />
            {/* Rotta dinamica: :id può essere qualsiasi numero */}
            <Route path="/task/:id" element={<TaskDetailPage tasks={tasks} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App
