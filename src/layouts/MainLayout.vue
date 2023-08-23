<template>
<div class="flex justify-center full-width">
  <q-layout view="lHh Lpr lFf" class="full-width" style="max-width: 1100px;">
    <q-drawer
    side="left"
    v-model="drawerLeft"
    show-if-above
    :breakpoint="50"
    class=""
    :mini="$q.screen.xs"
    >
    <div class=" test-container test-dim ">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="inbox" />
        </q-item-section>

        <q-item-section>
          Inbox
        </q-item-section>
      </q-item>

    </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-drawer
    side="right"
    v-model="drawerRight"
    show-if-above
    :breakpoint="1000"
    >
    <div class=" test-container test-dim ">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="inbox" />
        </q-item-section>

        <q-item-section>
          Inbox
        </q-item-section>
      </q-item>

    </div>
    </q-drawer>
  </q-layout>
  </div>
</template>

<script setup  lang="ts">
import { Dark, useQuasar } from 'quasar'
import { ref, computed, watch } from 'vue'
const drawerRight = ref(true)
const drawerLeft = ref(true)

</script>
<style scoped lang="scss">
.test-container{
  border-style: solid ;
  border-color: crimson;
}
.test-dim{
  max-width: 500px;
  min-width: 200px;
  width: 100%;
}

::v-deep{
  .q-drawer--left{
  left: auto!important;
}
}
</style>
