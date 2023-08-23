<template>
<q-drawer
  side="left"
  v-model="drawerRight"
  show-if-above
  class="drawer-dim bg-black no-scroll "
  :breakpoint="80"
  :mini="$q.screen.sm || $q.screen.xs"
  >
<div class=" content-left  container">
  <q-card class="fit bg-black action-width white-theme  no-border no-shadow "   >
    <q-card-section v-if="props.logUser" class=" full-height white-teme flex " >
      <div class="column">
        <ButtonChip icon="fa-solid fa-house fa-xs" :label-name='"Home"'/>
        <ButtonChip icon="fa-solid fa-magnifying-glass" :label-name='"Explore"'/>
        <ButtonChip icon="fa-regular fa-bell" :label-name='"Notification"'/>
        <ButtonChip icon="fa-regular fa-envelope" :label-name='"Message"'/>
        <ButtonChip icon="fa-regular fa-rectangle-list" :label-name='"Lists"'/>
        <ButtonChip icon="fa-regular fa-bookmark" :label-name='"Bookmarks"'/>
        <ButtonChip icon="fa-solid fa-user-group" :label-name='"Communities"'/>
        <ButtonChip icon="fa-regular fa-circle-check " :label-name='"Verified"'/>
        <ButtonChip icon="fa-regular fa-user" :label-name='"Profile"'/>
        <ButtonChip icon="fa-solid fa-ellipsis" :label-name='"More"'/>
        <div side>
          <q-btn v-if="($q.screen.sm || $q.screen.xs)" dense round color="primary" icon="fa-solid fa-plus" />
        </div>
        <ButtonChip v-if="!($q.screen.sm || $q.screen.xs)" color="primary" :label-name='"Post"'/>
      </div>
      <div class="column justify-end full-width">
        <q-item clickable  class=" text-label-bold mypadding" >
          <q-avatar size="30px" color="primary" >
            <ImageAvatar :log-user="props.logUser"/>
            <span class="text-h6">{{props.logUser.username[0]}}</span>
          </q-avatar>
            <q-item-section v-if="!($q.screen.sm || $q.screen.xs)" class="q-pl-sm">
              {{props.logUser.username}}
            </q-item-section>
            <MyButtonBtn v-if=" logUser && !($q.screen.sm || $q.screen.xs)" @click="$emit('logout')" icon="mdi-exit-to-app" />
        </q-item>
      </div>
    </q-card-section>
  </q-card>
</div>
</q-drawer>
</template>

<script setup lang="ts">
import { User } from 'src/myInterface'
import MyButtonBtn from './MyButtonBtn.vue'
import ButtonChip from './ButtonChip.vue'
import ImageAvatar from 'src/components/ImageAvatar.vue'
import { ref } from 'vue'
const drawerRight = ref(true)
const props = defineProps({
  logUser: Object as () => User // Declare the prop and its type
})

</script >
<style scoped lang="scss">
.mypadding{
  padding-left: 10px;
  justify-content: end;
}
.action-width{
  max-width: 250px;
}
.drawer-dim{
  min-width: 200px;
  max-width: 500px;
  width: 100%;
}

.content-left{
  display: flex;
  position: relative;
  justify-content: end;
}
.container{

  height: 99vh;
}
::v-deep{
  .q-drawer--left{
  left: auto!important;
}
}
</style>
