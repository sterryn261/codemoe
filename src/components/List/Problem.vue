<script setup lang="ts">
import { computed, inject } from 'vue';
import type { Ref } from 'vue';
import type { ProblemStatus, ProblemT } from '../../data/types';

const props = defineProps<{ problem: ProblemT }>();
const problemStatus = inject<Ref<ProblemStatus> | undefined>("problemStatus");

const status = computed(() => problemStatus == undefined ? undefined : problemStatus.value?.get(props.problem.id))

const statusClass = (stats: boolean | undefined): string => {
  return stats === undefined ? '' : (stats === false ? 'tried' : 'ok');
}

</script>

<template>
  <div class="problem" :class="statusClass(status)">
    <div class="id">
      {{ problem.index }}
    </div>
    <span> {{ problem.name }}</span>

    <div class="tags">
      <div class="tag" v-for="(tag, index) in [...problem.tags].slice(0, 4)">
        <div v-if="index < 3">
          {{ tag }}
        </div>
        <div v-else-if="index == 3">
          ...
        </div>
      </div>
    </div>
    <div class="rating">
      {{ problem.rating }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.problem {
  display: flex;
  flex-direction: row;
  gap: 1em;
  position: relative;

  background: var(--dt-bg);
  padding: 0.5em;
  border-radius: 0.5em;

  .id {
    background: var(--dq-bg);

    padding: 0 1em;
    border-radius: 0.5em;
  }

  .tags {
    display: flex;
    flex-direction: row;
    gap: 0.3em;
    position: absolute;
    right: 0;
    margin-right: 1em;

    .tag {
      background: var(--dq-bg);

      padding: 0 1em;
      border-radius: 0.5em;
    }
  }
}

.ok {
  background: #f00;
}

.tried {
  background: #00f;
}
</style>
