<script setup lang="ts">
import type { ContestType, SubmissionType } from '../../types';
import Contest from './Contest.vue';

defineProps<{ cData: ContestType[] }>();
</script>

<template>
  <div class="list">
    <Contest :contest="contest" v-for="contest in cData" />
  </div>
</template>

<style scoped lang="scss">
.list {
  width: 70vw;
}
</style>
