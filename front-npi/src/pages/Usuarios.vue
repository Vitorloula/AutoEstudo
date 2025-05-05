<template>
  <v-container fluid>
    <v-row class="mb-4">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-primary text-center">
          Gerenciamento de Usuários
        </h1>
      </v-col>
    </v-row>

    <v-row align="stretch" justify="center" dense>
      <v-col cols="12" md="6">
        <v-card class="pa-4 elevation-3 h-100">
          <v-card-title class="text-h6 text-primary font-weight-medium">
            Novo Usuário
          </v-card-title>
          <v-divider class="my-2" />
          <v-card-text>
            <UsuarioForm />
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4 elevation-3 h-100">
          <v-card-title class="text-h6 text-primary font-weight-medium">
            Lista de Usuários
          </v-card-title>
          <v-divider class="my-2" />
          <v-card-text>
            <UsuarioList />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import UsuarioForm from '../components/UsuarioForm.vue';
import UsuarioList from '../components/UsuarioList.vue';
</script>
