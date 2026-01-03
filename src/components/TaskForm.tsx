import { useState } from 'react';

interface TaskFormProps {
  onAddTask: (titolo: string) => void;
}

export const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [nuovoTitolo, setNuovoTitolo] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impedisce il ricaricamento della pagina
    if (nuovoTitolo.trim() === "") return; // Non aggiunge task vuote

    onAddTask(nuovoTitolo);
    setNuovoTitolo(""); // Svuota l'input dopo l'invio
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
      <input
        type="text"
        value={nuovoTitolo}
        onChange={(e) => setNuovoTitolo(e.target.value)}
        placeholder="Aggiungi una nuova attività..."
        className="flex-1 p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
      >
        Aggiungi
      </button>
    </form>);
};