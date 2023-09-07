<script setup>
import {UsernameService} from "@/UsernameService";
import {ref} from "vue";

const someone = ref(new UsernameService())

// setInterval(() => {
//   someone.value.username = "黄"
// }, 1000)
//
setTimeout(() => {
  someone.value.username = "李"
}, 2000,)
</script>

<template>
  <h1>{{ someone.username }}</h1>
</template>

<style scoped>
h1 {
  color: red;
}
</style>