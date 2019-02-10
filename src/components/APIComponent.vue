<template></template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import axios from 'axios';
    import {Todo} from "../models";

    @Component
    export default class APIComponent extends Vue {
        @Prop() backendUrl!: string;

        loading: boolean = false;
        failed: boolean = false;

        mounted() {
            this.loading = true;
            axios.get<Todo[]>('http://' + this.backendUrl + '/todos')
                .then(response => {
                    this.loading = false;
                    this.$emit('dataLoadingSuccess', response.data);
                })
                .catch(err => {
                    console.log(err);
                    this.failed = true;
                    this.loading = false;
                    this.$emit('dataLoadingFailed', err);
                })
            ;
        }
    }
</script>