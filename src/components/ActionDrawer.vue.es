<template>
<div class=" content-left  container">
  <q-card class="fit bg-black action-width white-theme "   >
    <q-card-section v-if="props.logUser" class=" full-height white-teme flex" >
      <div class="column full-width">
        <q-btn label="Home" icon="fa-solid fa-house fa-xs" unelevated rounded class=" text-label-bold flex "/>
        <q-btn label="Explore" icon="fa-solid fa-magnifying-glass" unelevated rounded class=" text-label-bold"/>
        <q-btn label="Notification" icon="fa-regular fa-bell" unelevated rounded class=" text-label-bold"/>
        <q-btn label="Message" icon="fa-regular fa-envelope" unelevated rounded class=" text-label-bold"/>
        <q-btn label="Lists" icon="fa-regular fa-rectangle-list" unelevated rounded class=" text-label-bold"/>
        <q-btn label="Bookmarks" icon="fa-regular fa-bookmark" unelevated rounded class=" text-label-bold"/>
        <q-btn label="Communities" icon="fa-solid fa-user-group" unelevated rounded class=" text-label-bold"/>
        <q-btn label="Verified" icon="fa-regular fa-circle-check " unelevated rounded class=" text-label-bold"/>
        <q-btn label="Profile" icon="fa-regular fa-user" unelevated rounded class=" text-label-bold"/>
        <q-btn label="More" icon="fa-solid fa-ellipsis" unelevated rounded class=" text-label-bold"/>
        <q-btn label="Post" unelevated rounded color="primary" class=" text-label-bold"/>
      </div>
      <div class="column justify-end full-width">
        <q-item clickable  class=" text-label-bold mypadding" >
          <q-avatar size="30px" color="primary" >
            <ImageAvatar :log-user="props.logUser"/>
            <span class="text-h6">{{props.logUser.username[0]}}</span>
          </q-avatar>
          <q-item-section class="mypadding">
            {{props.logUser.username}}
          </q-item-section>
          <MyButtonBtn v-if=" logUser " @click="$emit('logout')" icon="mdi-exit-to-app" />
        </q-item>
      </div>
    </q-card-section>
  </q-card>
</div>
</template>

<script setup lang="ts">
import { User } from 'src/myInterface'
import MyButtonBtn from './MyButtonBtn.vue'
import ImageAvatar from 'src/components/ImageAvatar.vue'

const props = defineProps({
  logUser: Object as () => User // Declare the prop and its type
})

</script >
<style scoped>
.mypadding{
  padding-left: 10px;
  justify-content: end;
}
.action-width{
  max-width: 250px;
}

.content-left{
  display: flex;
  position: relative;
  justify-content: end;
}
.container{

  height: 99vh;
}
</style>
