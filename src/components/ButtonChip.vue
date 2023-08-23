<template>
  <q-chip  unelevated rounded clickable text-color="white" class=" text-label-bold flex mybody" >
    <div class="q-pl-sm">
      {{$q.screen.sm || $q.screen.xs? '':props.labelName}}
    </div>
  </q-chip>
</template>

<script setup lang="ts">
const props = defineProps({
  labelName: String
}
)

</script>
