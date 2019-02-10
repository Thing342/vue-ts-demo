<template>
<footer class="footer">
    <span class="todo-count">
        <strong>{{itemsLeft}}</strong> {{ itemSingularOrPlural }} left to complete.
    </span>
    <button class="btn btn-secondary" @click="clearCompleted()">Clear completed</button>
</footer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Todo } from "../models";

@Component
export default class TodoFooter extends Vue {
    @Prop() itemsLeft!: number;
    @Prop() clearCompleted!: ()=>void;

    get itemSingularOrPlural(): string {
        return this.itemsLeft === 1 ? 'item' : 'items';
    }
}
</script>
