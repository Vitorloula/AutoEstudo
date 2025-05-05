<template>
  <v-app>
    <v-main>
      <v-container>
        <v-toolbar 
          v-if="authState.isAuthenticated" 
          flat 
          color="primary" 
          dark
        >
          <v-toolbar-title>Autoestudo</v-toolbar-title>
          <v-btn text :to="{ path: '/usuarios' }">Usuários</v-btn>
          <v-btn text :to="{ path: '/cursos' }">Cursos</v-btn>
        </v-toolbar>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { authState } from './auth'; 
</script>