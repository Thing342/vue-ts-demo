export interface Todo {
    title: string;
    completed: boolean;
}

export interface AppState {
    newTodoTitle: string;
    todos: Todo[];
}