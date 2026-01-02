// Definiamo la struttura dei dati
interface TaskProps {
  id: number;
  titolo: string;
  completato: boolean;
  onToggle: (id: number) => void; // Una funzione che non restituisce nulla
}

export const TaskItem = ({ id, titolo, completato, onToggle }: TaskProps) => {
  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <input 
        type="checkbox" 
        checked={completato} 
        onChange={() => onToggle(id)} 
      />
      <span style={{ textDecoration: completato ? 'line-through' : 'none' }}>
        {titolo}
      </span>
    </div>
  );
};
