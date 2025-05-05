<template>
    <v-list two-line>
      <v-list-item v-for="c in cursos" :key="c.id">
        <v-list-item-content>
          <v-list-item-title>{{ c.nome }} ({{ c.sigla }})</v-list-item-title>
          <v-list-item-subtitle>Turno: {{ c.turno }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  interface Curso {
    id: number;
    nome: string;
    sigla: string;
    turno: string;
  }
  
  const cursos = ref<Curso[]>([]);
  const carregando = ref<boolean>(false);
  
  onMounted(async () => {
    carregando.value = true;
    try {
      const res = await axios.get('http://localhost:8080/curso');
      cursos.value = res.data;
    } catch (error) {
      console.error('Erro ao carregar cursos', error);
      alert('Falha ao obter cursos');
    } finally {
      carregando.value = false;
    }
  });
  </script>
  