<template>
  <q-page class="flex flex-center" padding>
    <div>
    <h5 class="q-my-md text-center">Registrati</h5>
    <q-form>
    <q-card >
      <q-card-section>
        <q-input v-model="username" filled placeholder="username" label="username" class="q-mb-xm"/>
      </q-card-section>
      <q-card-section>
        <q-input v-model="email" filled placeholder="email@exemple.com" label="email" class="q-mb-xm"/>
      </q-card-section>
      <q-card-section>
        <q-input v-model="pass" filled label="password" type="password" class="q-mb-xm"/>
      </q-card-section>
      <q-card-section>
        <q-input v-model="confirmPass" filled placeholder="conferma password" type="password"  label="conferma_password" class="q-mb-xm"/>
      </q-card-section>
      <q-btn @click="registerFunction" label="register" class="full-width" color="primary"/>
      <q-btn @click="login" label="login" class="full-width"  color="primary"/>
  </q-card>
</q-form>
</div>
</q-page>
</template>

<script setup  lang="ts">
import { ref } from 'vue'
import { validateFormRegister } from 'src/fucntion/auth.ts'
import { useRouter } from 'vue-router'
const pass = ref('')
const email = ref('')
const username = ref('')
const confirmPass = ref('')
const route = useRouter()
const registerFunction = async () => {
  const response = await validateFormRegister(username.value, email.value, pass.value, confirmPass.value)
  if (response !== undefined) {
    route.push('/auth/login')
  } else {
    alert('something go wrong')
  }
}
const login = () => {
  route.push('/auth/login')
}
</script>
