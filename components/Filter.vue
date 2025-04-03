<template>
  <v-text-field v-model="author" label='Autor' />
  <v-text-field v-model="title" label='Titulo' />
</template>

<script setup lang='ts'>

const author = defineModel<string>('author');
const title = defineModel<string>('title');

</script>