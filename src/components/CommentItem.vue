<template>
    <q-item v-ripple class="bg-black white-teme " >
      <q-item-section avatar>
       <ImageAvatar :log-user="props.comment?.user"/>
      </q-item-section >
      <q-item-section>
      <q-item-label lines="1">
        <span class="text-bold " >{{ props.comment?.user.username }}</span>
        </q-item-label>
        <q-item-label caption  class=" white-teme " lines="2">
        <span class="break-word">{{props.comment?.comment.content}}</span>
      </q-item-label>
      </q-item-section>
  </q-item>
    <q-separator dense color="white" />

</template>

<script setup lang="ts">
import ImageAvatar from 'src/components/ImageAvatar.vue'
import type { CommentWithUser } from 'src/myInterface.d.ts'
const props = defineProps({
  comment: Object as () => CommentWithUser // Declare the prop and its type
})

</script>
