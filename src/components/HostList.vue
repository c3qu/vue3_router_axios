<script setup>
import {computed} from "vue";
import {Select} from "bkui-vue";

const subject = ["英语", "数学"]
// localStorage.setItem("subject", JSON.stringify(["数学", "语文"]))

let selectOptions = computed(({
      get() {
        return localStorage.getItem('token') || 0;
      },
      set(value) {
        localStorage.setItem('token', value);
      }
    }
))
setTimeout(() => {
  // localStorage.setItem("subject", JSON.stringify(["英语", "语文"]))
  subject[0] = "eng"
}, 10000)
</script>

<template>
  <div>
    {{selectOptions}}
    <button @click="selectOptions++"> + </button>
  </div>
<!--  <select>-->
<!--    <option v-for="i in selectOptions">{{ i }}</option>-->
<!--  </select>-->
</template>

<style scoped>
h1 {
  color: red;
}
</style>