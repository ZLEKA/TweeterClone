<template>
  <q-dialog v-model="show" class="justify-center full-height ">
    <q-card class="mydialog fixed-center" >
      <div  class="  ">
        <q-card-section>
          <q-input v-model="comment" label="Write your comment" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" @click="noWrite" />
          <q-btn color="primary" label="Save" @click="saveComment" />
        </q-card-actions>
      </div>
      <q-scroll-area class="myscroll">
      <div v-if="renderComponent" class="">
        <CommentList :tweet-id="tweetid"/>
      </div>
    </q-scroll-area>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import CommentList from 'src/components/CommentList.vue'
import { nextTick, ref, watch } from 'vue'
import { sendDataToServer, API_REQUEST } from 'src/fucntion/auth.ts'
import { useRoute, useRouter } from 'vue-router'

const comment = ref('')
const show = ref(false)
const route = useRoute()
const router = useRouter()
const tweetid = ref<string>()
const renderComponent = ref(true)
const saveComment = async () => {
  if (tweetid.value !== null && tweetid.value !== undefined) {
    console.log('tweet id :' + tweetid.value)
    const formData = new FormData()
    formData.append('tweet_id', tweetid.value.toString())
    formData.append('content', comment.value)
    const newcomment = await sendDataToServer(formData, API_REQUEST + 'comment')
    console.log(newcomment)
    comment.value = ''
  }
  renderComponent.value = false
  await nextTick()
  renderComponent.value = true
}

const noWrite = () => {
  router.push('/')
}

const showFunc = () => {
  if (route.query.tweet_id !== undefined && route.query.tweet_id !== null) {
    tweetid.value = route.query.tweet_id.toString()
  }
  comment.value = ''
  show.value = !show.value
}

watch(() => route.query.tweet_id, showFunc)
</script>
<style>
.mydialog{
  width: 700px;
  height: 500px;
}
.myscroll{
  height: 360px;
}

</style>
