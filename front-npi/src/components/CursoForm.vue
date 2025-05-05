<template>
  <v-card class="pa-6 my-4" elevation="4" rounded="xl">
    <v-form @submit.prevent="salvar" ref="formRef" v-model="formValid">
      <v-text-field
        v-model="curso.nome"
        label="Nome do curso"
        :rules="[v => !!v || 'Campo obrigatório']"
        clearable
        dense
        outlined
        required
      />
      <v-text-field
        v-model="curso.sigla"
        label="Sigla"
        :rules="[v => !!v || 'Campo obrigatório']"
        clearable
        dense
        outlined
        required
      />
      <v-select
        v-model="curso.turno"
        :items="turnos"
        label="Turno"
        :rules="[v => !!v || 'Selecione um turno']"
        item-title="label"
        item-value="value"
        clearable
        dense
        outlined
        required
      />
      <v-btn
        type="submit"
        color="primary"
        class="mt-4"
        :disabled="!formValid"
      >
        Salvar
      </v-btn>
    </v-form>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'

interface Curso {
  nome: string
  sigla: string
  turno: string
}

interface TurnoItem {
  label: string
  value: string
}

const curso = reactive<Curso>({
  nome: '',
  sigla: '',
  turno: '',
})

const formRef = ref()
const formValid = ref(false)

const snackbar = reactive({
  show: false,
  text: '',
  color: '',
})

const turnos = ref<TurnoItem[]>([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8080/curso/turnos')
    turnos.value = res.data.map((t: string) => ({
      value: t,
      label: formatarTurno(t),
    }))
  } catch (error) {
    console.error('Erro ao carregar turnos', error)
    snackbar.text = 'Erro ao carregar turnos'
    snackbar.color = 'error'
    snackbar.show = true
  }
})

function formatarTurno(turno: string): string {
  switch (turno) {
    case 'MANHA': return 'Manhã'
    case 'TARDE': return 'Tarde'
    case 'NOITE': return 'Noite'
    default: return turno
  }
}

async function salvar() {
  const form = formRef.value
  if (!(await form.validate())) return

  try {
    await axios.post('http://localhost:8080/curso', curso)
    snackbar.text = 'Curso salvo com sucesso'
    snackbar.color = 'success'
    snackbar.show = true

    curso.nome = ''
    curso.sigla = ''
    curso.turno = ''
    form.reset()
  } catch (error) {
    console.error('Erro ao salvar curso', error)
    snackbar.text = 'Falha ao salvar curso'
    snackbar.color = 'error'
    snackbar.show = true
  }
}
</script>
