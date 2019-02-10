<template>
<div>
    <nav class="navbar navbar-light bg-light border-bottom">
        <a href="/" class="navbar-brand">
            <img src="./vue-logo.png" height="40px" alt="Vue logo">
            Todos
        </a>
    </nav>
    <api :backendUrl="'localhost:3000'"
         @dataLoadingSuccess="setTodos" />
    <div class="container">
        <section class="card my-2 p-4">
            <input type="text" class="new-todo" placeholder="What needs to be done?"
                   v-model="newTodoTitle" @keyup.enter="createTodo" autofocus>
            <small class="form-text text-muted">Press enter to add a new item.</small>
        </section>
        <section class="card my-2 p-4" v-if="this.todos.length">
            <ul class="list-group my-2">
                <todo-item v-for="(todo, index) in todos" v-bind:key="todo.title"
                           :todo="todo" @toggleCompleted="toggleCompleted(index)" @removeSelf="removeTodo(index)" />
            </ul>
            <button class="btn btn-primary" @click="toggleAll">Mark all as completed</button>
        </section>
        <section class="card my-2 p-4">
            <todo-footer v-if="todos.length" :itemsLeft="remaining.length" :clearCompleted="clearCompleted" />
        </section>
    </div>
</div>
</template>

<script lang="ts">
import TodoFooter from "./TodoFooter.vue";
import TodoHeader from "./TodoHeader.vue";
import TodoItem from "./TodoItem.vue";
import APIComponent from "./APIComponent.vue";

import { Vue, Component } from "vue-property-decorator";
import {AppState, Todo} from "../models";

@Component({
    components: {
        "todo-item": TodoItem,
        "todo-footer": TodoFooter,
        "todo-header": TodoHeader,
        "api": APIComponent,
    }
    })
export default class TodoApp extends Vue implements AppState {
    newTodoTitle: string = '';
    todos: Todo[] = [
        { completed: false, title: 'Use Vue with typescript!' }
    ]

    setTodos(todos: Todo[]): void {
        this.todos = todos;
    }

    createTodo(): void {
        const title = this.newTodoTitle.trim();
        if (!title) {
            return;
        }

        const newTodo: Todo = {
            completed: false,
            title: title
        };

        this.todos.push(newTodo);
        this.newTodoTitle = '';
    }

    removeTodo(index: number): void {
        if (index >= this.todos.length) {
            throw new Error(`Index deletion ad ${index} greated than ${this.todos.length}`)
        }

        this.todos.splice(index, 1);
    }

    toggleCompleted(index: number): void {
        console.log(`Todo #${index} completed!`);
        const current = this.todos[index];
        this.todos.splice(index, 1, {...current, completed: !current.completed});
    }

    clearCompleted(): void {
        this.todos = this.remaining;
    }

    toggleAll(): void {
        const stateForAll = this.completed.length !== this.todos.length;
        for (const todo of this.todos) {
            todo.completed = stateForAll
        }
    }

    get completed(): Todo[] {
        return this.todos.filter(todo => todo.completed);
    }

    get remaining(): Todo[] {
        return this.todos.filter(todo => !todo.completed);
    }
}
</script>

<style lang="sass">

</style>