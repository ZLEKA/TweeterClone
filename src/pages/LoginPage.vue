<template>
  <q-page class="flex flex-center" padding>
    <div>
    <h5 class="q-my-md text-center">Login</h5>
    <q-form>
    <q-card >
      <q-card-section>
        <q-input v-model="email" filled placeholder="email@exemple.com" label="email" class="q-mb-xm"/>
      </q-card-section>
      <q-card-section>
        <q-input v-model="pass" filled label="password" type="password" class="q-mb-xm"/>
      </q-card-section>
      <q-checkbox label="remember me" :model-value="true" class="q-mb-sm"/>
      <q-btn @click="loginFunction" label="login" class="full-width" color="primary"/>
      <q-btn @click="register" label="register" class="full-width" color="primary"/>
  </q-card>
</q-form>
</div>
</q-page>
</template>

<script setup  lang="ts">
import { ref } from 'vue'
import { validateForm } from 'src/fucntion/auth.ts'
import { useRouter } from 'vue-router'
const pass = ref('')
const email = ref('')
const route = useRouter()
const loginFunction = async () => {
  const response = await validateForm(email.value, pass.value)
  console.log(document.cookie)
  if (response === null) {
    route.push('/')
  } else {
    alert('something go wrong')
  }
}
const register = () => {
  route.push('/auth/register')
}
</script>
