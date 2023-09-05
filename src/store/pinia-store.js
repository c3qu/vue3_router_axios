import {defineStore} from "pinia";
import {ref} from "vue";

export const dnfStore = defineStore('route', () => {
    const route = ref()
    return {route}
})