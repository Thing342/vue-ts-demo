import Vue from "vue";
import BootstrapVue from 'bootstrap-vue';
import TodoApp from "./components/TodoApp.vue";

import './style.sass';

Vue.use(BootstrapVue);

let v = new Vue({
    el: "#app",
    template:`<todo-app />`,
    components: {
        TodoApp
    }
})