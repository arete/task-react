export interface Task {
    id: number,
    titolo: string,
    completato: boolean
}

export interface ApiTask {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}