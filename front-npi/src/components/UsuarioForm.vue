<template>
  <v-card class="mx-auto my-4" max-width="500" elevation="3" title="Cadastro de Usuário">
    <v-container>
      <v-text-field
        v-model="usuario.name"
        label="Nome"
        outlined
        color="primary"
        dense
        required
        data-test="user-input"
      />

      <v-text-field
        v-model="usuario.email"
        label="Email"
        outlined
        color="primary"
        dense
        required
        type="email"
        data-test="email-input"
      />

      <v-text-field
        v-model="usuario.senha"
        label="Senha"
        outlined
        color="primary"
        dense
        required
        type="password"
        placeholder="Digite sua senha"
        data-test="password-input"
      />

      <v-label class="mb-1 text-medium-emphasis">Usuário Ativo</v-label>
      <div class="d-flex align-center mb-4">
        <div
          class="custom-checkbox"
          @click="usuario.ativo = !usuario.ativo"
          :class="{ 'checked': usuario.ativo }"
          data-test="checkbox"
        >
          <v-icon v-if="usuario.ativo" color="black" size="18">mdi-check</v-icon>
        </div>
        <span class="ml-2">{{ usuario.ativo ? 'Sim' : 'Não' }}</span>
      </div>

      <v-select
        v-model="usuario.cursoId"
        :items="cursos"
        item-title="nome"
        item-value="id"
        label="Curso"
        :rules="[v => !!v || 'Selecione um curso']"
        dense
        outlined
        required
        data-test="select-items"
      />
    </v-container>

    <v-divider />

    <v-card-actions>
      <v-spacer />
      <v-btn color="success" @click="salvar" data-test="save-button">
        Salvar Usuário
        <v-icon icon="mdi-check" end />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'

interface Curso {
  id: number
  nome: string
  sigla: string
  turno: string
}

interface Usuario {
  name: string
  email: string
  senha: string
  ativo: boolean
  cursoId: number | null
}

const usuario = reactive<Usuario>({
  name: '',
  email: '',
  senha: '',
  ativo: false,
  cursoId: null
})

const cursos = ref<Curso[]>([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8080/curso')
    cursos.value = res.data._embedded?.cursos || res.data
  } catch (err) {
    console.error('Erro ao carregar cursos:', err)
  }
})

async function salvar() {
  try {
    const usuarioPayload = {
      name: usuario.name,
      email: usuario.email,
      senha: usuario.senha,
      ativo: usuario.ativo,
      curso: { id: usuario.cursoId }
    }

    await axios.post('http://localhost:8080/usuario', usuarioPayload)
    alert('Usuário salvo com sucesso')

    // Limpar o formulário após o sucesso
    usuario.name = ''
    usuario.email = ''
    usuario.senha = ''
    usuario.ativo = false
    usuario.cursoId = null
  } catch (err) {
    console.error('Erro ao salvar usuário:', err)
    alert('Erro ao salvar usuário')
  }
}
</script>

<style scoped>
.custom-checkbox {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid #4caf50;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.custom-checkbox.checked {
  background-color: #4caf50;
}
</style>
