<template>
  <v-dialog v-model="dialog" max-width='500'>
    <v-card title="Details" v-if="details">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="details.author" label="Author" v-if="details" disabled></v-text-field>
        </v-col>
        <v-col cols='12'>
          <v-text-field v-model="details.title" label="Title" v-if="details" disabled></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="details.body" label="Body" v-if="details" disabled></v-textarea>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

const dialog = defineModel<boolean>('dialog');
const details = defineModel<{ author: string, title: string, body: string } | null>('details');

</script>