import Vue from "vue";
import BootstrapVue from 'bootstrap-vue';
import TodoApp from "./components/TodoApp.vue";

import './style.sass';
import TodoStore from "./TodoStore";

Vue.use(BootstrapVue);

let v = new Vue({
    el: "#app",
    template:`<todo-app :todoStore="store" />`,
    components: {
        TodoApp
    },
    data: {
        store: new TodoStore()
    }
})