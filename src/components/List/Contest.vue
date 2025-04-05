<script setup lang="ts">
import { computed } from 'vue';
import type { ContestType, UserType, SubmissionType } from '../../data/types';
import Problem from './Problem.vue';

const props = defineProps<{ contest: ContestType, uData: UserType | null }>();
const statuses = computed<SubmissionType[]>(() => {
  if (props.uData !== null) {
    return props.uData.submissions.filter((e) => {
      return e.contestId === props.contest.id;
    })
  }
  return [];
})

</script>

<template>
  <div class="contest">

    <div class="title">
      <span> {{ contest.name }} </span>
    </div>
    <div class="problems">
      <Problem :problem="problem" v-for="problem in contest.problems" :statuses="statuses" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.contest {
  display: flex;
  flex-direction: column;
  gap: 0.75em;

  width: 70vw;
  padding: 0.75em 1em;
  border-radius: 0.5em;
  margin: 2em 2vw;

  color: var(--dp-text);
  background: var(--ds-bg);

  .title {
    display: flex;
    flex-direction: row;
    gap: 1em;

    margin-left: 1em;

    span {
      font-weight: bold;
      line-height: 1.7em;
    }
  }

  .problems {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
}
</style>
