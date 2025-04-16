<script setup lang="ts">
import type { ContestType, UserType, FilterType } from './data/types';
import { getData, getUser } from './data/data';
import filterFunc from './data/filter';
import { computed, onMounted, ref, provide } from 'vue';

import Header from './components/Header.vue';
import List from './components/List/List.vue';
import Filter from './components/Filter/Filter.vue';

const status = ref<number>(1);
const contestData = ref<ContestType[]>([]);
const userData = ref<UserType | null>(null);

const handle = ref<string>("");

const filter = ref<FilterType>({
  contestType: new Set<string>,
  tags: new Set<string>,
  difficultyUpper: -1,
  difficultyLower: -1,
  sorting: false,
  random: false,

  userProblemStatus: "none",
  recommendation: false,
});
const modifyFilter = (newFilter: FilterType): void => {
  filter.value = newFilter;
}

provide('userData', userData);

onMounted(() => {
  getData().then((data) => {
    contestData.value = data;
    status.value = 0;
  }, (error) => {
    console.error(error);
    status.value = -1;
  })
})

const contests = computed(() => filterFunc(filter.value, contestData.value, userData.value));

</script>

<template>
  <Header />
  <div class="loading" v-if="status === 1">
    Loading...
  </div>
  <div class="content" v-if="status === 0">
    <List :contest="contests" />
    <div class="sidebar">
      <div class="user">
        <form @submit.prevent="() => {
          getUser(handle).then((data) => {
            if (data !== null) {
              userData = data;
            }

          }, (error) => {
            console.error(error);
          })
        }">
          <input type="text" placeholder="Enter your handle here..." :value="handle">
        </form>
      </div>
      <Filter :filter="filter" @modify-filter="modifyFilter" />
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
