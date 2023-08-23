<template>
  <q-drawer
    side="right"
    v-model="drawerRight"
    show-if-above
    :breakpoint="1000"
    class="bg-black no-scroll"
    >
    <div class="white-teme raw">
        <q-icon  />
        <q-input  icon="event" dense label-color="white" bg-color="dark" color="white" class="col white-teme q-pt-sm q-pl-sm" rounded outlined label="Search" />
    </div>
    </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawerRight = ref(true)
</script>
<style lang="scss">
::v-deep{
  .q-drawer--left{
  left: auto!important;
}
}
</style>
