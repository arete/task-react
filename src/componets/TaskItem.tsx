// Definiamo la struttura dei dati
interface TaskProps {
    id: number;
    titolo: string;
    completato: boolean;
    onToggle: (id: number) => void; // Una funzione che non restituisce nulla
    onDelete: (id: number) => void; // Aggiungiamo questa riga
}

export const TaskItem = ({ id, titolo, completato, onToggle, onDelete }: TaskProps) => {
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
            <button
                onClick={() => onDelete(id)}
                style={{ color: 'white', backgroundColor: '#ff4d4d', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '5px 10px' }}
            >
                Elimina
            </button>
        </div>
    );
};
