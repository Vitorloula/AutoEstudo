<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Digite seu email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { authState } from '@/auth';
  import axios from 'axios';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  
  const handleLogin = async () => {
  if (email.value.trim() && password.value.trim()) {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        email: email.value,
        senha: password.value,
      });

      if (response.status === 200) {
        authState.login(); 
        alert(response.data.message);
        router.push('/usuarios');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        alert('E-mail ou senha incorretos.');
      } else {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Tente novamente.');
      }
    }
  } else {
    alert('Por favor, preencha todos os campos.');
  }
};
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    background-color: #f9f9f9;
  }
  
  h1 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>