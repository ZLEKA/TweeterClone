<template>
<div class="bg-black flex justify-center full-width ">
  <q-layout view="lHh Lpr lFf"  class="full-width " style="max-width: 1100px;" >
     <div class=" container no-border" >
        <ActionDrawer :log-user="logUser" @logout="logout"/>
      </div>
    <q-page-container  >
        <q-page  class="column no-border  " >
              <div class="  white-teme myborder mysize "  >
                <div class=" mytransparent container">
                <q-toolbar >
                  <q-toolbar-title >
                    ICS ma brutto e con meno cose
                  </q-toolbar-title>
                <q-item>
                  <div v-if="!logUser">
                    <MyButtonBtn @click="login" icon="mdi-login"/>
                    <MyButtonBtn @click="register" icon="mdi-account-plus"/>
                  </div>
                </q-item>
                </q-toolbar>
                <q-tabs dense>
                  <q-route-tab to="/" label="for you" />
                  <q-route-tab to="/" label="Following" />
                </q-tabs>
                </div>
                <q-scroll-area   class=" container"  style="height: 88vh;">
                  <div class="row text-white" v-if=" logUser ">
                    <q-input label-color="white" color="white" class="col-10 text-white" rounded outlined v-model='newTweet' label="Write Tweet" />
                    <div class="col-2  flex  justify-center content-center ">
                      <MyButtonBtn fab color="white" icon="mdi-send" @click="saveTweet" />
                    </div>
                  </div>
                  <div v-if="renderComponent" class="tweetsize  ">
                    <TweetItem />
                  </div>
                </q-scroll-area>
              </div>
        </q-page>
      <router-view />
    </q-page-container>
  <SearchDrawer/>
  </q-layout>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import MyButtonBtn from 'src/components/MyButtonBtn.vue'
import TweetItem from 'src/components/TweetItem.vue'
import SearchDrawer from 'src/components/SearchDrawer.vue'
import ActionDrawer from 'src/components/ActionDrawer.vue'
import { sendDataToServer, API_REQUEST, isLog } from 'src/fucntion/auth.ts'
import type { User } from 'src/myInterface.d.ts'
import { useRouter } from 'vue-router'
const newTweet = ref<string>('')
const logUser = ref<User>()
const route = useRouter()
const renderComponent = ref(true)
import { Dark } from 'quasar'
Dark.set(true)
onMounted(async () => {
  logUser.value = await isLog()
  console.log(logUser.value)
})

const logout = async () => {
  console.log(await sendDataToServer(new FormData(), 'http://127.0.0.1/api/auth/logout'))
  logUser.value = undefined
  renderComponent.value = false
  await nextTick()
  renderComponent.value = true
}

const login = () => {
  route.push('/auth/login')
}
const register = () => {
  route.push('/auth/register')
}
const saveTweet = async () => {
  const formData = new FormData()
  formData.append('content', newTweet.value)
  const tweet = await sendDataToServer(formData, API_REQUEST)
  console.log(tweet)
  newTweet.value = ''
  renderComponent.value = false
  await nextTick()
  renderComponent.value = true
}

</script>
<style lang="scss">
.mybody, .mytransparent{
  background-color: black;
}
.dark-theme{
  color:black;
}
.white-teme{
  text-decoration-color: azure !important;
  text-decoration: aliceblue !important;
  text-emphasis-color: azure !important;
  color: azure !important;
  border-color: azure !important;
}
.myborder{
  border-style: solid;
  border-width: 1px;
  border-top: 0px;
  border-bottom: 0px;
}
.mysize{
  min-width: 300px;
  max-width: 500px;
  width: 100%;

}
.col-left, .col-right{
  min-width: 300px;

}
.drower-layaout{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
}
.mytransparent {
  background-color: rgb(0, 0, 0, 0.2); /* Adjust the opacity as needed */
  backdrop-filter: blur(10px); /* Adjust the blur radius as needed */
}
.pg-margin{
  margin-top: 40px!important;
}
.tweetsize{
  min-width: 250px;

}
.container{
  //border-style: solid ;
  //border-color: crimson;
}

</style>
