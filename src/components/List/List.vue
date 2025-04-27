<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ContestT, ProblemT } from '../../data/types';
import Contest from './Contest.vue';

const props = defineProps<{ contests: ContestT[], problems: ProblemT[] }>();

let render = ref<number>(10);

window.onscroll = () => {
  if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
    render.value += 5;
  }
};
let problemsSets = computed(() => {
  const data = new Set<number>();
  props.problems.forEach((e) => {
    data.add(e.contestId);
  })
  return data;
})

let loadData = computed(() => props.contests.filter((e) => problemsSets.value.has(e.id)).slice(0, render.value))

</script>

<template>
  <div class="list">
    <Contest :contest="contest" :problems="problems" v-for="contest in loadData" />
  </div>
</template>

<style scoped lang="scss">
.list {
  width: 73vw;
}
</style>
