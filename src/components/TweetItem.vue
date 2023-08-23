<template>
  <q-list class=""  :bordered="true" >
    <div v-for="(tweetAndUser, index ) in tweets" :key="index" >
        <q-item clickable v-ripple class="q-pa-lg" @vnodeBeforeMount="uglyFunctionForBoolean(tweetAndUser)">
          <q-item-section avatar>
            <ImageAvatar :log-user="tweetAndUser.user" />
          </q-item-section>
          <q-item-section>
            <div v-if="!tweetAndUser.edit ">
              <q-item-label lines="1" class="white-theme ">
                <span class="text-bold ">{{tweetAndUser.user.username}}</span>
                <span class="q-pl-sm" >{{ lastUpdate(tweetAndUser) }}</span>
              </q-item-label>
              <q-item-label caption lines="2" class="white-theme break-word">
                {{tweetAndUser.tweet.content}}
              </q-item-label>
            </div>
          <textarea v-else-if="logUser?.id === tweetAndUser.user.id" class="bg-black white-theme" v-model="tweetEditedContent"></textarea>
          </q-item-section>
        </q-item>
    <q-card>
      <q-separator inset="item" />
        <q-card-actions align="around"  class="mybody white-theme" >
          <div>
            <MyButtonBtn  :disabled="logUser?false:true" :color="!isObjectEmpty(tweetAndUser.user_like) ? 'positive':'white' " size="sm"  icon="mdi-thumb-up" @click="Like(tweetAndUser)" />
            <span>{{tweetAndUser.likes}}</span>
          </div>
          <MyButtonBtn  :disabled=" logUser?.id === tweetAndUser.user.id?false:true"   @click="deleteTweet(tweetAndUser.tweet.id)"  icon="mdi-delete"/>
          <MyButtonBtn v-if="!tweetAndUser.edit && logUser?.id === tweetAndUser.user.id" :disabled="logUser?.id === tweetAndUser.user.id?false:true" @click="startEditing(tweetAndUser)" icon="mdi-update"/>
          <MyButtonBtn v-else-if="logUser?.id === tweetAndUser.user.id" @click="updateTweet(tweetAndUser)" icon="mdi-content-save" />
          <MyButtonBtn  :disabled="logUser?false:true"  @click="writeTweetComment(tweetAndUser)"  icon="mdi-comment-text-multiple-outline"/>
        </q-card-actions>
      <q-separator inset="item" />
    </q-card>
  </div>
  <WriteCommentDialog />
  </q-list>
</template>

<script setup lang="ts">
import MyButtonBtn from './MyButtonBtn.vue'
import ImageAvatar from 'src/components/ImageAvatar.vue'
import { onMounted, ref } from 'vue'
import WriteCommentDialog from 'src/components/WriteCommentDialog.vue'
import { sendDataToServer, askToServerGet, API_REQUEST, isLog } from 'src/fucntion/auth.ts'
import { type TweetWithUser, type User } from 'src/myInterface.ts'
import { useRouter } from 'vue-router'

const tweets = ref<Array<TweetWithUser>>([])
const tweetEditedContent = ref('')
const logUser = ref<User>()
const comment = ref('')
const router = useRouter()
async function allTweets () {
  try {
    const tweets = await askToServerGet('http://127.0.0.1/api/tweet/getAllTweets')
    console.log(tweets)
    return tweets
  } catch (error) {
    alert('Error! Could not reach the API. ' + error)
  }
}
onMounted(async () => {
  tweets.value = await allTweets()
  logUser.value = await isLog()
  console.log(logUser.value)
})

const deleteTweet = async (id:number) => {
  try {
    const formData = new FormData()
    await sendDataToServer(formData, `http://127.0.0.1/api/tweet/delete/${id}`, 'DELETE')
    tweets.value = await allTweets()
  } catch (error) {
    alert('Error! Could not reach the API. ' + error)
  }
}
const startEditing = (tweetAndUser:TweetWithUser) => {
  tweetAndUser.edit = true
  tweetEditedContent.value = tweetAndUser.tweet.content
}
const updateTweet = async (tweetAndUser:TweetWithUser) => {
  const formData = new FormData()
  formData.append('tweet_id', tweetAndUser.tweet.id.toString())
  formData.append('content', tweetEditedContent.value)
  const tweetUpdate = await sendDataToServer(formData, API_REQUEST + 'update')
  console.log(tweetUpdate)
  tweetAndUser.tweet.content = tweetEditedContent.value
  tweetAndUser.edit = false
}

const writeTweetComment = (tweetAndUser:TweetWithUser) => {
  comment.value = ''
  router.replace({ path: '/', query: { tweet_id: tweetAndUser.tweet.id } })
}

const Like = async (tweetAndUser:TweetWithUser) => {
  tweetAndUser.user_like = await askToServerGet(`http://127.0.0.1/api/tweet/like/${tweetAndUser.tweet.id}`)
  if (Object.prototype.hasOwnProperty.call(tweetAndUser.user_like, 'id')) {
    tweetAndUser.likes++
  } else {
    tweetAndUser.likes--
  }
}

const uglyFunctionForBoolean = (tweetAndUser:TweetWithUser) => {
  tweetAndUser.showComments = false
  tweetAndUser.writeComment = false
}

const lastUpdate = (tweetAndUser:TweetWithUser) => {
  const lastUpdateTime = new Date(tweetAndUser.tweet.updated_at)

  const currentDate = new Date()

  const timeDifferenceInMilliseconds = (currentDate.getTime() + (currentDate.getTimezoneOffset() * 60 * 1000)) - lastUpdateTime.getTime()
  console.log(currentDate.getTimezoneOffset() * 60)
  let seconds = Math.floor((timeDifferenceInMilliseconds / (1000)) + 1)
  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const year = day * 365

  const years = Math.floor(seconds / year)
  seconds -= years * year

  const days = Math.floor(seconds / day)
  seconds -= days * day

  const hours = Math.floor(seconds / hour)
  seconds -= hours * hour

  const minutes = Math.floor(seconds / minute)
  seconds -= minutes * minute

  return `${years > 0 ? years + ' anni ' : ''}${days > 0 && years === 0 ? days + ' giorni ' : ''}${hours > 0 && days === 0 ? hours + ' ore ' : ''}${minutes > 0 && hours === 0 ? minutes + ' minuti ' : ''}${seconds > 0 && minutes === 0 ? seconds + ' secondi' : ''} `
}
// -------------------------------------
function isObjectEmpty (obj:object) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false // The object has at least one own property, so it's not empty
    }
  }
  return true // No own properties found, the object is empty
}

</script>
<style scoped>

.white-theme{
  text-decoration-color: azure;
  text-decoration: aliceblue;
  text-emphasis-color: azure;
  color: azure;
  border-color: azure;
}

</style>
