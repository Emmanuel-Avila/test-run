<template>
  <v-dialog v-model="errStore.open" width="auto">
    <v-card :title="errStore.title" :text="errStore.description">
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Cerrar" @click="closeDialog()"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { closeDialog, errStore } from '~/stores/err.store';
</script>