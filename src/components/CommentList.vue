<template>
  <q-list  style="  max-height: 800px; ">
    <CommentItem v-for="comment in comments" :key="comment.comment.id" :comment="comment"  />
</q-list>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CommentItem from 'src/components/CommentItem.vue'
import { askToServerGet, API_REQUEST } from 'src/fucntion/auth.ts'
import { type CommentWithUser } from 'src/myInterface.ts'

const comments = ref<Array<CommentWithUser>>()
const props = defineProps({
  tweetId: String
})

onMounted(async () => {
  console.log('Comment list: ' + props.tweetId)
  comments.value = await askToServerGet(API_REQUEST + 'getTweetComments/' + props.tweetId)
  if (typeof comments.value === 'object' && Object.keys(comments.value).length === 0) {
    // createTodo()
  }
})

</script>
