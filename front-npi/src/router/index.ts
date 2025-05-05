import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Usuarios from '../pages/Usuarios.vue';
import Cursos from '../pages/Cursos.vue';
import Login from '@/pages/Login.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Login },
  { path: '/usuarios', component: Usuarios },
  { path: '/cursos', component: Cursos },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
