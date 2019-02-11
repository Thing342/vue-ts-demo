<template>
<div>
    <nav class="navbar navbar-light bg-light border-bottom">
        <a href="/" class="navbar-brand">
            <img src="./vue-logo.png" height="40px" alt="Vue logo">
            Todos
        </a>
    </nav>
    <div class="container">
        <section class="card my-2 p-4">
            <input type="text" class="new-todo" placeholder="What needs to be done?"
                   v-model="newTodoTitle" @keyup.enter="submitTodo" autofocus>
            <small class="form-text text-muted">Press enter to add a new item.</small>
        </section>
        <section class="card my-2 p-4" v-if="(todoStore !== undefined) && (todoStore.size > 0)">
            <ul class="list-group my-2">
                <todo-item v-for="(todo, index) in todoStore.todos" v-bind:key="todo.title"
                           :todo="todo" @toggleCompleted="todoStore.toggleTodo(index)" @removeSelf="todoStore.removeTodo(index)" />
            </ul>
            <button class="btn btn-primary" @click="todoStore.toggleAll">Mark all as completed</button>
        </section>
        <section class="card my-2 p-4">
            <todo-footer v-if="todoStore.size > 0" :todoStore="todoStore" />
        </section>
    </div>
</div>
</template>

<script lang="ts">
import TodoFooter from "./TodoFooter.vue";
import TodoHeader from "./TodoHeader.vue";
import TodoItem from "./TodoItem.vue";

import {Vue, Component, Prop} from "vue-property-decorator";
import TodoStore from "../TodoStore";

@Component({
    components: {
        "todo-item": TodoItem,
        "todo-footer": TodoFooter,
        "todo-header": TodoHeader
    }
    })
export default class TodoApp extends Vue {
    @Prop() todoStore!: TodoStore;
    newTodoTitle: string = '';

    mounted() {
        this.todoStore.fetch("localhost:3000")
            .then(() => console.log("Fetched todos."))
            .catch(e => console.error(e));
    }

    submitTodo() {
        this.todoStore.createTodo(this.newTodoTitle);
        this.newTodoTitle = "";
    }
}
</script>

<style lang="sass">

</style>