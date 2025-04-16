<script setup lang="ts">
import { computed, watch } from 'vue';
import type { FilterType } from '../../data/types';
import Dropdown from './Dropdown.vue';

const props = defineProps<{ filter: FilterType }>()
const emit = defineEmits(["modify-filter"]);

const filter = computed(() => props.filter);
watch(filter, () => {
  emit('modify-filter', filter);
})


</script>
<template>
  <Dropdown />
</template>
<style lang="scss"></style>