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
        <div className="flex items-center justify-between p-4 mb-3 bg-white rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={completato}
                    onChange={() => onToggle(id)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
                />
                <span className={`text-lg ${completato ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {titolo}
                </span>
            </div>

            <button
                onClick={() => onDelete(id)}
                className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
                Elimina
            </button>
        </div>
    );
};
