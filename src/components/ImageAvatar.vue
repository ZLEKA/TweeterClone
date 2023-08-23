<template>
  <q-avatar size="30px" color="primary"  >
    <span class="text-h6">{{props.logUser?.username[0]}}</span>
  </q-avatar>
</template>

<script setup lang="ts">
import { User } from 'src/myInterface'
const props = defineProps({
  logUser: Object as () => User // Declare the prop and its type
})
</script>
