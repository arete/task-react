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
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Cosa devi fare?"
        value={nuovoTitolo}
        onChange={(e) => setNuovoTitolo(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>
        Aggiungi
      </button>
    </form>
  );
};