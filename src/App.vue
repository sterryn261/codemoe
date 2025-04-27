<script setup lang="ts">
import type { Contest, Problem, User, Filter, ProblemStatus, ContestStatus } from './data/types';
import { getData, getUser } from './data/data';
import { onMounted, ref, provide } from 'vue';

import Header from './components/Header/Header.vue';
import List from './components/List/List.vue';
import { processContestStatus } from './data/process';

const webStatus = ref<number>(1);

const contestData = ref<Contest[]>([]);
const problemData = ref<Problem[]>([]);
const userData = ref<User | undefined>(undefined);
const contestStatus = ref<ContestStatus | undefined>(undefined);
const problemStatus = ref<ProblemStatus | undefined>(undefined);

const handle = ref<string>("");

// const filter = ref<FilterType>({
//   contestType: new Set<string>,
//   tags: new Set<string>,
//   difficultyUpper: -1,
//   difficultyLower: -1,
//   sorting: false,
//   random: false,

//   userProblemStatus: "none",
//   recommendation: false,
// });

provide('problemData', problemData);
provide('userData', userData);
provide('submissionData', problemStatus);


onMounted(() => {
  getData().then((data) => {
    webStatus.value = 0;

    contestData.value = data.contestData;
    problemData.value = data.problemData;
  }, (error) => {
    webStatus.value = -1;

    console.error(error);
  })
})

const onSubmitHandle = () => {
  getUser(handle.value).then((data) => {
    if (data.userData !== undefined && data.problemStatus !== undefined) {
      userData.value = data.userData;
      problemStatus.value = data.problemStatus;
      contestStatus.value = processContestStatus(problemData.value, problemStatus.value);
    }
  }, (error) => {
    console.error(error);
  })

}
</script>

<template>
  <Header />
  <div class="loading" v-if="webStatus === 1">
    Loading...
  </div>
  <div class="error" v-else-if="webStatus === -1">
    Error
  </div>
  <div class="content" v-else>
    <List :contest="contestData" />
    <div class="sidebar">
      <div class="user">
        <form @submit.prevent="onSubmitHandle()">
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
