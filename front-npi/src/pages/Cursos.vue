<template>
    <div>
      <v-card class="mb-4 pa-4">
        <v-card-title class="text-h5">Gerenciar Cursos</v-card-title>
        <v-card-text>
          <CursoForm />
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import CursoForm from '../components/CursoForm.vue';
  </script>
  