<template>
  <v-list>
    <v-list-item v-for="u in usuarios" :key="u.id">
      <v-row align="center" justify="space-between" class="w-100">
        <v-col cols="9">
          <v-list-item-content>
            <v-list-item-title class="text-h6">{{ u.name }}</v-list-item-title>
            <v-list-item-subtitle>Email: {{ u.email }}</v-list-item-subtitle>
            <v-list-item-subtitle>Ativo: {{ u.ativo ? 'Sim' : 'Não' }}</v-list-item-subtitle>
            <v-list-item-subtitle>Curso: {{ u.nomeCurso }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-col>

        <v-col cols="3" class="d-flex justify-end align-center">
          <v-list-item-action class="d-flex align-center" style="gap: 12px;">
            <v-tooltip text="Editar">
              <template #activator="{ props }">
                <v-btn icon color="primary" @click="abrirDialog(u)" v-bind="props" data-test="edit-button">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-tooltip>

            <v-tooltip text="Excluir">
              <template #activator="{ props }">
                <v-btn icon color="error" @click="apagarUsuario(u)" v-bind="props" data-test="delete-button">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </v-list-item-action>
        </v-col>
      </v-row>
    </v-list-item>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h5">Editar Usuário</v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="usuarioEditado.name"
              label="Nome"
              outlined
              dense
              required
              data-test="name-dialog"
            />
            <v-text-field
              v-model="usuarioEditado.email"
              label="Email"
              outlined
              dense
              required
              type="email"
              data-test="email-dialog"
            />
            <v-checkbox
              v-model="usuarioEditado.ativo"
              label="Usuário Ativo"
              color="success"
              data-test="checkbox-dialog"
            />
            <v-select
              v-model="usuarioEditado.cursoId"
              :items="cursos"
              item-title="nome"
              item-value="id"
              label="Curso"
              outlined
              dense
              required
            />
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="salvarEdicao" data-test="save-dialog">Salvar</v-btn>
          <v-btn color="error" text @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Usuario {
  id: number
  name: string
  email: string
  senha?: string
  ativo: boolean
  cursoId?: number | null
  curso?: { id: number; nome: string }
  nomeCurso?: string
}

interface Curso {
  id: number
  nome: string
}

const usuarios = ref<Usuario[]>([])
const cursos = ref<Curso[]>([])
const dialog = ref(false)
const usuarioEditado = ref<Usuario>({
  id: 0,
  name: '',
  email: '',
  ativo: false,
  cursoId: null,
})

const carregarUsuarios = async () => {
  try {
    const res = await axios.get('http://localhost:8080/usuario')
    const usuariosData: Usuario[] = res.data

    usuariosData.forEach(u => {
      u.nomeCurso = u.curso?.nome || 'Curso não encontrado'
    })

    usuarios.value = usuariosData
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
  }
}

const carregarCursos = async () => {
  try {
    const res = await axios.get('http://localhost:8080/curso')
    cursos.value = res.data
  } catch (error) {
    console.error('Erro ao carregar cursos:', error)
  }
}

const abrirDialog = (u: Usuario) => {
  usuarioEditado.value = { ...u, cursoId: u.curso?.id || null }
  dialog.value = true
}

const salvarEdicao = async () => {
  try {
    await axios.put(`http://localhost:8080/usuario/${usuarioEditado.value.id}`, usuarioEditado.value)
    alert('Usuário atualizado com sucesso!')
    dialog.value = false
    await carregarUsuarios()
  } catch (error) {
    console.error('Erro ao salvar edição:', error)
  }
}

const apagarUsuario = async (u: Usuario) => {
  if (!u.ativo && confirm(`Tem certeza que deseja excluir ${u.name}?`)) {
    try {
      await axios.delete(`http://localhost:8080/usuario/${u.id}`)
      await carregarUsuarios()
    } catch (err) {
      console.error(`Erro ao deletar usuário ${u.name}:`, err)
    }
  } else {
    alert('Usuário ativo não pode ser excluído.')
  }
}

onMounted(() => {
  carregarUsuarios()
  carregarCursos()
})
</script>
