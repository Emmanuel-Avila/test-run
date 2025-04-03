<template>
  <v-container>
    <v-btn @click="clearLocalStorage">Clear local</v-btn>
    <Filter v-model:author="author" v-model:title="title"></Filter>
    <Table v-model:author="author" v-model:title="title" v-model:dialog="dialog" v-model:details="details"></Table>
  </v-container>
  <Details v-model:dialog="dialog" v-model:details="details"></Details>
  <ErrDialog></ErrDialog>
</template>



<script setup lang="ts">
import Details from '~/components/organism/details/Details.vue';
import Table from '~/components/organism/table/Table.vue';

const DEFAULT_DETAILS = {
  title: '',
  author: '',
  body: ''
}

const author = ref('');
const title = ref('');
const dialog = ref(false);

const details = ref(DEFAULT_DETAILS);



function clearLocalStorage() {
  localStorage.setItem("favoritePosts", "");
  console.log(localStorage.getItem("favoritePosts"));
}

</script>