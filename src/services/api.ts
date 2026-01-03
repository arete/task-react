// src/services/api.ts
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'; // Esempio

export const taskService = {
    // Ottieni tutte le task
    async getAll() {
        const res = await fetch(`${BASE_URL}?_limit=5`);
        return res.json();
    },

    // Crea una nuova task
    async create(titolo: string) {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify({ title: titolo, completed: false, userId: 1 }),
            headers: { 'Content-type': 'application/json' },
        });
        return res.json();
    },

    // Elimina una task
    async delete(id: number) {
        await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    },

    // Aggiorna lo stato (completata o no)
    async toggle(id: number, completata: boolean) {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ completed: !completata }),
            headers: { 'Content-type': 'application/json' },
        });
        return res.json();
    }
};
