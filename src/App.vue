<script setup lang="ts">
import type { ContestType, UserType, FilterType } from './types';
import { getData } from './data';
import filterFunc from './filter';
import { computed, onMounted, ref } from 'vue';

import Header from './components/Header.vue';
import List from './components/List/List.vue';

const cData = ref<ContestType[]>([]);


const filter = ref<FilterType>({
  contestType: new Set<string>,
  tags: new Set<string>,
  difficultyUpper: 2000,
  difficultyLower: 1000,
  sorting: false,
  random: true,

  userContestStatus: "none",
  userProblemStatus: "none",
  recommendation: false,
});



onMounted(() => {
  getData().then((data) => {
    cData.value = data;
  })
})
const contests = computed(() => filterFunc(filter.value, cData.value));
</script>

<template>
  <Header />
  <div class="content">
    <List :cData="contests" />
    <div class="sidebar">
      <div class="user">
        <input type="text" placeholder="Enter here...">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  position: relative;
  margin-top: 5em;
}

.sidebar {
  position: absolute;
  top: 0;
  right: 0;

  width: 24vw;
  height: 10em;
  margin-right: 2em;

  .user {
    width: 100%;
    padding: 1em;
    border-radius: 0.5em;

    background: var(--ds-bg);

    input {
      width: 100%;
      padding: 0.5em;
      border: none;
      border-radius: 0.5em;

      color: var(--dp-text);
      background: var(--ds-bg);
    }


    input:focus {
      outline: none;
      background: var(--dt-bg);
    }
  }
}
</style>
