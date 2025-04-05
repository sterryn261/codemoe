<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ContestType, SubmissionType } from '../../types';
import Contest from './Contest.vue';

const props = defineProps<{ cData: ContestType[] }>();
let render = ref<number>(20);

window.onscroll = (e) => {
  if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
    render.value += 5;
  }
};

let contests = computed(() => {
  return props.cData.slice(0, render.value);
})

</script>

<template>
  <div class="list">
    <Contest :contest="contest" v-for="contest in contests" />
  </div>
</template>

<style scoped lang="scss">
.list {
  width: 73vw;
}
</style>
