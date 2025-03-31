<script setup lang="ts">
import type { ContestType, UserType } from '../../types';
import Contest from './Contest.vue';

const props = defineProps<{ cData: ContestType[] }>();
</script>

<template>
  <div class="list">
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />
    <Contest />

  </div>
</template>

<style scoped lang="scss">
.list {
  width: 70vw;
}
</style>
