<script setup lang="ts">
import type { ContestType, UserType, FilterType } from './data/types';
import { getData, getUser } from './data/data';
import filterFunc from './data/filter';
import { computed, onMounted, ref } from 'vue';

import Header from './components/Header.vue';
import List from './components/List/List.vue';

const status = ref<string>("loading");
const cData = ref<ContestType[]>([]);
const uData = ref<UserType | null>(null);
const handle = ref<string>("");

const filter = ref<FilterType>({
  contestType: new Set<string>,
  tags: new Set<string>,
  difficultyUpper: -1,
  difficultyLower: -1,
  sorting: false,
  random: false,

  userContestStatus: "none",
  userProblemStatus: "none",
  recommendation: false,
});

onMounted(() => {
  getData().then((data) => {
    cData.value = data;
    status.value = "done";
  }, (error) => {
    console.error(error);
    status.value = "error";
  })
})
const contests = computed(() => filterFunc(filter.value, cData.value));

</script>

<template>
  <Header />
  <div class="loading" v-if="status === 'loading'">
    Loading...
  </div>
  <div class="content" v-if="status === 'done'">
    <List :cData="contests" :uData="uData" />
    <div class="sidebar">
      <div class="user">
        <form @submit.prevent="() => {
          getUser(handle).then((data) => {
            if (data !== null) {
              uData = data;
            }

          }, (error) => {
            console.error(error);
          })
        }">
          <input type="text" placeholder="Enter your handle here..." :value="handle">
        </form>
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
