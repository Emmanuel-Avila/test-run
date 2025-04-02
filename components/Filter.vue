<template>
  <v-text-field label='Autor' v-model="author"></v-text-field>
  <v-text-field label='Titulo' v-model="title"></v-text-field>
</template>

<script setup lang='ts'>
const author = defineModel('author');
const title = defineModel('title');

</script>